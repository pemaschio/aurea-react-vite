import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export async function apiRequest<T = unknown>(
  url: string,
  method: string = "GET",
  body?: unknown
): Promise<T> {
  const token = localStorage.getItem("supabase_token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      (errorData as { message?: string }).message ||
        `Request failed with status ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}
