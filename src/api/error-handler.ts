import axios from 'axios';

export interface ApiError {
  message: string;
  statusCode?: number;
  raw?: any;
}

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message || 'An unexpected API error occurred';
    const statusCode = error.response?.status;
    return { message, statusCode, raw: error };
  }
  
  return {
    message: error instanceof Error ? error.message : 'An unknown error occurred',
  };
}
