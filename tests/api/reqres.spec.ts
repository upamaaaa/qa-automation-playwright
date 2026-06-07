import { test, expect } from "@playwright/test";

const BASE = "https://jsonplaceholder.typicode.com";

test.describe("API Tests — Users", () => {

  test("API-001: GET /users returns list of users", async ({ request }) => {
    const res = await request.get(`${BASE}/users`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty("id");
    expect(body[0]).toHaveProperty("email");
    expect(body[0]).toHaveProperty("name");
  });

  test("API-002: POST /posts creates a resource and returns 201", async ({ request }) => {
    const res = await request.post(`${BASE}/posts`, {
      data: { title: "Playwright Test", body: "QA Automation", userId: 1 },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body.id).toBeTruthy();
    expect(body.title).toBe("Playwright Test");
    expect(body.userId).toBe(1);
  });

  test("API-003: GET /users/1 returns correct user", async ({ request }) => {
    const res = await request.get(`${BASE}/users/1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.email).toBeTruthy();
    expect(body.name).toBeTruthy();
  });

  test("API-004 (negative): GET /users/9999 returns 404", async ({ request }) => {
    const res = await request.get(`${BASE}/users/9999`);
    expect(res.status()).toBe(404);
  });

  test("API-005: GET /posts returns 100 posts", async ({ request }) => {
    const res = await request.get(`${BASE}/posts`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(100);
  });

  test("API-006 (negative): GET /posts/9999 returns 404", async ({ request }) => {
    const res = await request.get(`${BASE}/posts/9999`);
    expect(res.status()).toBe(404);
  });

  test("PUT /posts/1 updates resource and returns 200", async ({ request }) => {
    const res = await request.put(`${BASE}/posts/1`, {
      data: { id: 1, title: "Updated Title", body: "Updated body", userId: 1 },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.title).toBe("Updated Title");
  });

  test("DELETE /posts/1 returns 200", async ({ request }) => {
    const res = await request.delete(`${BASE}/posts/1`);
    expect(res.status()).toBe(200);
  });
});

test.describe("API Tests — Posts & Comments", () => {

  test("GET /posts/1 returns correct post", async ({ request }) => {
    const res = await request.get(`${BASE}/posts/1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.id).toBe(1);
    expect(body.title).toBeTruthy();
  });

  test("GET /comments?postId=1 returns comments with emails", async ({ request }) => {
    const res = await request.get(`${BASE}/comments?postId=1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
    body.forEach((c: { postId: number; email: string }) => {
      expect(c.postId).toBe(1);
      expect(c.email).toContain("@");
    });
  });

  test("GET /posts?userId=1 filters posts by user", async ({ request }) => {
    const res = await request.get(`${BASE}/posts?userId=1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.length).toBeGreaterThan(0);
    body.forEach((p: { userId: number }) => {
      expect(p.userId).toBe(1);
    });
  });
});