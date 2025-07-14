import { NEXT_PUBLIC_BASE_URL } from "@/lib/constants/env";
import Cookies from "js-cookie";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type ApiParams = Record<string, string>;
type ApiData = Record<string, any> | FormData;

interface ApiFetchOptions extends RequestInit {
  method?: HttpMethod;
  params?: ApiParams;
  data?: ApiData;
}

interface ApiFetchType {
  <T = any>(endpoint: string, options?: ApiFetchOptions): Promise<T>;
  get: <T = any>(
    endpoint: string,
    options?: Omit<ApiFetchOptions, "method" | "data">
  ) => Promise<T>;
  post: <T = any>(
    endpoint: string,
    options?: Omit<ApiFetchOptions, "method">
  ) => Promise<T>;
  put: <T = any>(
    endpoint: string,
    options?: Omit<ApiFetchOptions, "method">
  ) => Promise<T>;
  delete: <T = any>(
    endpoint: string,
    options?: Omit<ApiFetchOptions, "method" | "data">
  ) => Promise<T>;
}

const baseUrl = NEXT_PUBLIC_BASE_URL;

const apiFetch: ApiFetchType = async <T>(
  endpoint: string,
  { method = "GET", params, data, headers, ...rest }: ApiFetchOptions = {}
): Promise<T> => {
  const url = new URL(endpoint, baseUrl);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const token = Cookies.get("auth-storage");
  const finalHeaders = new Headers(headers || {});

  if (token && !finalHeaders.has("Authorization")) {
    finalHeaders.set("Authorization", `Bearer ${token}`);
  }

  let body: string | FormData | undefined;

  if (data) {
    const userHasContentType = [...finalHeaders.entries()].some(
      ([key]) => key.toLowerCase() === "content-type"
    );

    if (data instanceof FormData) {
      body = data;
      if (userHasContentType) {
        finalHeaders.delete("Content-Type");
      }
    } else {
      body = JSON.stringify(data);
      if (!userHasContentType) {
        finalHeaders.set("Content-Type", "application/json");
      }
    }
  }

  const response = await fetch(url.toString(), {
    method,
    headers: finalHeaders,
    body,
    ...rest,
  });

  if (!response.ok) {
    let errorMessage = `HTTP error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
      throw new Error(errorMessage);
    } catch (jsonErr) {
      // Kalau bukan JSON, lempar error biasa
      throw new Error(errorMessage);
    }
  }

  return response.json();
};

apiFetch.get = function <T = any>(
  endpoint: string,
  options: Omit<ApiFetchOptions, "method" | "data"> = {}
) {
  return apiFetch<T>(endpoint, { ...options, method: "GET" });
};

apiFetch.post = function <T = any>(
  endpoint: string,
  options: Omit<ApiFetchOptions, "method"> = {}
) {
  return apiFetch<T>(endpoint, { ...options, method: "POST" });
};

apiFetch.put = function <T = any>(
  endpoint: string,
  options: Omit<ApiFetchOptions, "method"> = {}
) {
  return apiFetch<T>(endpoint, { ...options, method: "PUT" });
};

apiFetch.delete = function <T = any>(
  endpoint: string,
  options: Omit<ApiFetchOptions, "method" | "data"> = {}
) {
  return apiFetch<T>(endpoint, { ...options, method: "DELETE" });
};

export { apiFetch };
