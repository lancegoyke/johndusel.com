import { CategoryInterface, PostInterface } from "../interfaces/PostInterface";

export async function getPosts(): Promise<PostInterface[]> {
  const res = await fetch("http://localhost:8000/api/posts/");
  const data = await res.json();
  return data;
}

export async function getLatestPosts(): Promise<PostInterface[]> {
  const res = await fetch("http://localhost:8000/api/posts/latest/");
  const data = await res.json();
  return data;
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostInterface[]> {
  const res = await fetch(
    `http://localhost:8000/api/posts/category/${categorySlug}/`
  );
  const data = await res.json();
  return data;
}

export async function getCategoryBySlug(
  categorySlug: string
): Promise<CategoryInterface> {
  const res = await fetch(
    `http://localhost:8000/api/categories/${categorySlug}/`
  );
  const data = await res.json();
  return data;
}
