import { connectToDB } from "../mongoose";
import { ApiError } from "./ApiErrors";
import { ApiResponse } from "./ApiResponse";

export async function asyncHandler<T>(
  operation: () => Promise<T>,
  successStatusCode: number
) {
  try {
    connectToDB();
    const result = await operation();
    // return new ApiResponse(successStatusCode, result);
    const response = new ApiResponse(successStatusCode, result);
    return response.toJSON();
  } catch (error: any) {
    throw new ApiError(500, `Failed to perform operation: ${error.message}`);
  }
}
