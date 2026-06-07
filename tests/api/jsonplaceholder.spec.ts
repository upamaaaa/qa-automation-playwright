import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../utils/apiHelper";
import { API } from "../../utils/testData";

test.describe("JSONPlaceholder API", () => {
  let api: ApiHelper;

  test.beforeEach(({ request }) => {
    api = new ApiHelper(request);
  });

  // API-007
  test("API-007: GET /posts returns 100 posts", async () => {
    const response = await api.get(`${API.jsonPlaceholder}/posts`);
    const posts = await api.assertJson<
      { id: number; title: string; body: string; userId: number }[]
    >(response, 200);

    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBe(100);
    expect(posts[0]).toHaveProperty("id");
    expect(posts[0]).toHaveProperty("title");
  });

  test("GET /posts/:id returns single post", async () => {
    const response = await api.get(`${API.jsonPlaceholder}/posts/1`);
    const post = await api.assertJson<{
      id: number;
      title: string;
      userId: number;
    }>(response, 200);

    expect(post.id).toBe(1);
    expect(post.title).toBeTruthy();
  });

  test("GET /posts?userId=1 filters posts by user", async () => {
    const response = await api.get(`${API.jsonPlaceholder}/posts?userId=1`);
    const posts = await api.assertJson<{ userId: number }[]>(response, 200);
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((p) => expect(p.userId).toBe(1));
  });

  test("POST /posts creates a new post", async ({ request }) => {
  const payload = { title: "Playwright Test", body: "Auto-generated", userId: 1 };
  const response = await request.post(`https://jsonplaceholder.typicode.com/posts`, {
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(payload),
  });
    const body = await api.assertJson<{
      id: number;
      title: string;
    }>(response, 201);

    expect(body.id).toBeTruthy();
    expect(body.title).toBe(payload.title);
  });

  test("GET /comments?postId=1 returns comments for a post", async () => {
    const response = await api.get(`${API.jsonPlaceholder}/comments?postId=1`);
    const comments = await api.assertJson<
      { postId: number; email: string }[]
    >(response, 200);

    expect(comments.length).toBeGreaterThan(0);
    comments.forEach((c) => {
      expect(c.postId).toBe(1);
      expect(c.email).toContain("@");
    });
  });
});
