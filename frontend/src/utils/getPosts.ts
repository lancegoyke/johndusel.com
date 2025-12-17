import { CategoryInterface, PostInterface } from "../interfaces/PostInterface";

export async function getPosts(): Promise<PostInterface[]> {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/posts/`);
    if (!res.ok) {
      console.warn(`API error fetching /posts/: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("API unavailable, returning empty posts:", error);
    return [];
  }
}

export async function getLatestPosts(): Promise<PostInterface[]> {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/posts/latest/`);
    if (!res.ok) {
      console.warn(`API error fetching /posts/latest/: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("API unavailable, returning empty latest posts:", error);
    return [];
  }
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostInterface[]> {
  try {
    const res = await fetch(
      `${process.env.BASE_API_URL}/posts/category/${categorySlug}/`
    );
    if (!res.ok) {
      console.warn(`API error fetching /posts/category/${categorySlug}/: ${res.status} ${res.statusText}`);
      return [];
    }
    return await res.json();
  } catch (error) {
    console.warn("API unavailable, returning empty category posts:", error);
    return [];
  }
}

export async function getCategoryBySlug(
  categorySlug: string
): Promise<CategoryInterface | null> {
  try {
    const res = await fetch(
      `${process.env.BASE_API_URL}/categories/${categorySlug}/`
    );
    if (!res.ok) {
      console.warn(`API error fetching /categories/${categorySlug}/: ${res.status} ${res.statusText}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.warn("API unavailable, returning null category:", error);
    return null;
  }
}
