import {
  CacheKeys,
  CacheTTL,
  deleteCached,
  deleteCachedByPattern,
  getCached,
  setCached,
} from "./redis";

/**
 * Generic cache-aside pattern wrapper
 * Tries to get from cache first, if miss, fetches from DB and caches result
 */
export async function cacheAside<T>({
  key,
  ttl,
  fetchFn,
}: {
  key: string;
  ttl: number;
  fetchFn: () => Promise<T>;
}): Promise<T> {
  // Try cache first
  const cached = await getCached<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Cache miss - fetch from source
  const data = await fetchFn();

  // Store in cache for next time (non-blocking)
  setCached(key, data, ttl).catch((err) =>
    console.error("[Cache] Background cache set failed:", err)
  );

  return data;
}

/**
 * Cache invalidation helpers for common operations
 */
export const invalidateCache = {
  /**
   * Invalidate user-related caches when user data changes
   */
  user: async (userId: string, username?: string) => {
    const keys = [CacheKeys.user(userId)];
    if (username) {
      keys.push(CacheKeys.userByUsername(username));
    }
    await deleteCached(...keys);
  },

  /**
   * Invalidate thread-related caches when thread changes
   */
  thread: async (threadId: string) => {
    await deleteCached(CacheKeys.thread(threadId), CacheKeys.threadsList());
  },

  /**
   * Invalidate all threads list cache (e.g., when new thread created)
   */
  allThreads: async () => {
    await deleteCached(CacheKeys.threadsList());
  },

  /**
   * Invalidate user's profile posts cache
   */
  profilePosts: async (userId: string) => {
    await deleteCached(CacheKeys.profilePosts(userId));
  },

  /**
   * Invalidate activity cache
   */
  activity: async (userId: string) => {
    await deleteCached(CacheKeys.activity(userId));
  },

  /**
   * Invalidate followers/following cache
   */
  followData: async (userId: string) => {
    await deleteCached(
      CacheKeys.followers(userId),
      CacheKeys.following(userId)
    );
  },

  /**
   * Invalidate all caches for a user (nuclear option)
   */
  allUserData: async (userId: string) => {
    await deleteCachedByPattern(`*${userId}*`);
  },
};

/**
 * Pre-built cache wrappers for common data fetching patterns
 */
export const CacheWrappers = {
  /**
   * Cache wrapper for user profile fetch
   */
  userProfile: async <T>(userId: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.user(userId),
      ttl: CacheTTL.USER_PROFILE,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for user by username fetch
   */
  userByUsername: async <T>(username: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.userByUsername(username),
      ttl: CacheTTL.USER_PROFILE,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for thread/post fetch
   */
  thread: async <T>(threadId: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.thread(threadId),
      ttl: CacheTTL.THREAD,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for threads list
   */
  threadsList: async <T>(fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.threadsList(),
      ttl: CacheTTL.THREADS_LIST,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for profile posts
   */
  profilePosts: async <T>(userId: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.profilePosts(userId),
      ttl: CacheTTL.THREADS_LIST,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for activity feed
   */
  activity: async <T>(userId: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.activity(userId),
      ttl: CacheTTL.ACTIVITY,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for followers list
   */
  followers: async <T>(userId: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.followers(userId),
      ttl: CacheTTL.FOLLOWERS,
      fetchFn,
    });
  },

  /**
   * Cache wrapper for following list
   */
  following: async <T>(userId: string, fetchFn: () => Promise<T>) => {
    return cacheAside({
      key: CacheKeys.following(userId),
      ttl: CacheTTL.FOLLOWERS,
      fetchFn,
    });
  },
};
