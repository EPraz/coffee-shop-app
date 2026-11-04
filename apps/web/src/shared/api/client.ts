export class ApiError extends Error {
  constructor(
    public code: string,
    public status: number,
    public details?: unknown,
  ) {
    super(code);
  }
}
export async function api<T>(
  path: string,
  options: Omit<RequestInit, "body"> & { body?: unknown } = {},
): Promise<T> {
  const response = await fetch("/api" + path, {
    ...options,
    credentials: "same-origin",
    signal: options.signal ?? AbortSignal.timeout(90000),
    headers: { "Content-Type": "application/json", ...options.headers },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });
  const result = await response.json().catch(() => ({ code: "server_error" }));
  if (!response.ok)
    throw new ApiError(
      result.code ?? "request_failed",
      response.status,
      result.details,
    );
  return result as T;
}
