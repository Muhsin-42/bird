import Redis from "ioredis";

/**
 * Redis client for caching and key-value storage
 *
 * This module provides a simple interface to Redis
 * for caching frequently accessed data and improving performance.
 *
 * Environment variables required:
 * - REDIS_URL (connection string from Vercel)
 */

/**
 * Cache key prefix patterns:
 * - user:{userId} - User profile data
 * - user:username:{username} - User lookup by username
 * - thread:{threadId} - Individual thread/post
 * - threads:all - All posts feed
 * - activity:{userId} - User activity feed
 * - followers:{userId} - User's followers list
 * - following:{userId} - User's following list
 */

/**
 * Default TTL (Time To Live) values in seconds
 */
export const CacheTTL = {
  USER_PROFILE: 300, // 5 minutes
  THREAD: 180, // 3 minutes
  THREADS_LIST: 120, // 2 minutes
  ACTIVITY: 120, // 2 minutes
  FOLLOWERS: 300, // 5 minutes
} as const;

/**
 * Cache key generators for consistent key naming
 */
export const CacheKeys = {
  user: (userId: string) => `user:${userId}`,
  userByUsername: (username: string) => `user:username:${username}`,
  thread: (threadId: string) => `thread:${threadId}`,
  threadsList: () => "threads:all",
  profilePosts: (userId: string) => `threads:profile:${userId}`,
  activity: (userId: string) => `activity:${userId}`,
  followers: (userId: string) => `followers:${userId}`,
  following: (userId: string) => `following:${userId}`,
} as const;

// Singleton Redis instance for serverless
let redisInstance: Redis | null = null;

/**
 * Get or create Redis connection (singleton pattern for serverless)
 */
function getRedisClient(): Redis | null {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redisInstance) {
    try {
      redisInstance = new Redis(process.env.REDIS_URL, {
        maxRetriesPerRequest: 3,
        retryStrategy: (times: number) => {
          if (times > 3) {
            return null; // Stop retrying
          }
          return Math.min(times * 50, 2000); // Exponential backoff
        },
        lazyConnect: true, // Don't connect immediately
      });

      // Handle connection errors gracefully
      redisInstance.on("error", (error) => {
        console.error("[Redis] Connection error:", error);
      });

      // Connect
      redisInstance.connect().catch((error) => {
        console.error("[Redis] Failed to connect:", error);
        redisInstance = null;
      });
    } catch (error) {
      console.error("[Redis] Failed to create client:", error);
      return null;
    }
  }

  return redisInstance;
}

/**
 * Check if Redis is available (configured with environment variables)
 */
export const isRedisAvailable = (): boolean => {
  return !!process.env.REDIS_URL;
};

/**
 * Get cached data with automatic error handling
 */
export async function getCached<T>(key: string): Promise<T | null> {
  try {
    const redis = getRedisClient();
    if (!redis) return null;

    const value = await redis.get(key);
    if (!value) {
      return null;
    }

    return JSON.parse(value) as T;
  } catch (error) {
    console.error(`[Cache] Error getting key ${key}:`, error);
    return null;
  }
}

/**
 * Set cached data with TTL and automatic error handling
 */
export async function setCached<T>(
  key: string,
  value: T,
  ttl?: number
): Promise<void> {
  try {
    const redis = getRedisClient();
    if (!redis) return;

    const serialized = JSON.stringify(value);

    if (ttl) {
      await redis.setex(key, ttl, serialized);
    } else {
      await redis.set(key, serialized);
    }
  } catch (error) {
    console.error(`[Cache] Error setting key ${key}:`, error);
  }
}

/**
 * Delete cached data
 */
export async function deleteCached(...keys: string[]): Promise<void> {
  try {
    const redis = getRedisClient();
    if (!redis) return;
    if (keys.length === 0) return;

    await redis.del(...keys);
  } catch (error) {
    console.error("[Cache] Error deleting keys:", error);
  }
}

/**
 * Delete cached data by pattern (e.g., "user:*")
 * Note: Use sparingly as this can be expensive
 */
export async function deleteCachedByPattern(pattern: string): Promise<void> {
  try {
    const redis = getRedisClient();
    if (!redis) return;

    // Use SCAN for safe pattern deletion in production
    const stream = redis.scanStream({
      match: pattern,
      count: 100,
    });

    const keysToDelete: string[] = [];

    stream.on("data", (keys: string[]) => {
      keysToDelete.push(...keys);
    });

    stream.on("end", async () => {
      if (keysToDelete.length > 0) {
        await redis.del(...keysToDelete);
      }
    });

    stream.on("error", (error) => {
      console.error(`[Cache] Error scanning pattern ${pattern}:`, error);
    });
  } catch (error) {
    console.error(`[Cache] Error deleting pattern ${pattern}:`, error);
  }
}

/**
 * Close Redis connection (useful for graceful shutdown)
 */
export async function closeRedis(): Promise<void> {
  if (redisInstance) {
    await redisInstance.quit();
    redisInstance = null;
  }
}
