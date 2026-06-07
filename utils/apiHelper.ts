import { APIRequestContext, expect } from "@playwright/test";

const DEFAULT_HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json",
  "x-api-key": "reqres-free-v1",
};

export class ApiHelper {
  constructor(private readonly request: APIRequestContext) {}

  async get(url: string, extraHeaders: Record<string, string> = {}) {
    return this.request.get(url, {
      headers: { ...DEFAULT_HEADERS, ...extraHeaders },
    });
  }

  async post(url: string, data: unknown, extraHeaders: Record<string, string> = {}) {
    return this.request.post(url, {
      headers: { ...DEFAULT_HEADERS, ...extraHeaders },
      data: JSON.stringify(data),
    });
  }

  async put(url: string, data: unknown, extraHeaders: Record<string, string> = {}) {
    return this.request.put(url, {
      headers: { ...DEFAULT_HEADERS, ...extraHeaders },
      data: JSON.stringify(data),
    });
  }

  async assertJson<T = unknown>(
    response: Awaited<ReturnType<APIRequestContext["get"]>>,
    expectedStatus: number
  ): Promise<T> {
    expect(response.status()).toBe(expectedStatus);
    return response.json() as Promise<T>;
  }

  async assertStatus(
    response: Awaited<ReturnType<APIRequestContext["get"]>>,
    expectedStatus: number
  ) {
    expect(response.status()).toBe(expectedStatus);
  }
}