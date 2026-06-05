import { CategoryInterface, PostInterface } from "../interfaces/PostInterface";

// Used by getStaticProps under `output: "export"`. Throw on failure so the
// static build fails loudly rather than baking an empty/partial site.

export async function getPosts(): Promise<PostInterface[]> {
  const res = await fetch(`${process.env.BASE_API_URL}/posts/`);
  if (!res.ok) {
    throw new Error(`API error fetching /posts/: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function getLatestPosts(): Promise<PostInterface[]> {
  const res = await fetch(`${process.env.BASE_API_URL}/posts/latest/`);
  if (!res.ok) {
    throw new Error(`API error fetching /posts/latest/: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

export async function getPostsByCategory(
  categorySlug: string
): Promise<PostInterface[]> {
  const res = await fetch(
    `${process.env.BASE_API_URL}/posts/category/${categorySlug}/`
  );
  if (!res.ok) {
    throw new Error(
      `API error fetching /posts/category/${categorySlug}/: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
}

export async function getCategoryBySlug(
  categorySlug: string
): Promise<CategoryInterface> {
  const res = await fetch(
    `${process.env.BASE_API_URL}/categories/${categorySlug}/`
  );
  if (!res.ok) {
    throw new Error(
      `API error fetching /categories/${categorySlug}/: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
}
