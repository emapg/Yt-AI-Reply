export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: any, defaultMessage: string): never {
  if (axios.isAxiosError(error)) {
    throw new ApiError(
      error.response?.data?.message || defaultMessage,
      error.response?.status,
      error
    );
  }
  throw new ApiError(defaultMessage, undefined, error);
}