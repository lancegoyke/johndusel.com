import { CategoryInterface, PostInterface } from "../interfaces/PostInterface";

type PostSlug = {
  params: {
    slug: string;
  };
};

export async function getPostSlugs(): Promise<PostSlug[]> {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/posts/`);
    if (!res.ok) {
      console.warn(`API error fetching /posts/: ${res.status} ${res.statusText}`);
      return [];
    }
    const data: PostInterface[] = await res.json();
    return data.map((post) => ({
      params: { slug: post.slug },
    }));
  } catch (error) {
    // Return empty array during build if API unavailable (pages generated on-demand)
    console.warn("API unavailable during build, pages will be generated on-demand:", error);
    return [];
  }
}

export async function getPostSlugsByCategory(
  categorySlug: string
): Promise<PostSlug[]> {
  try {
    const res = await fetch(
      `${process.env.BASE_API_URL}/posts/category/${categorySlug}/`
    );
    if (!res.ok) {
      console.warn(`API error fetching /posts/category/${categorySlug}/: ${res.status} ${res.statusText}`);
      return [];
    }
    const data: PostInterface[] = await res.json();
    return data.map((post) => ({
      params: { slug: post.slug },
    }));
  } catch (error) {
    console.warn("API unavailable during build:", error);
    return [];
  }
}

export async function getPostCategorySlugs(): Promise<PostSlug[]> {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/categories/`);
    if (!res.ok) {
      console.warn(`API error fetching /categories/: ${res.status} ${res.statusText}`);
      return [];
    }
    const data: CategoryInterface[] = await res.json();
    return data.map((category) => ({
      params: { slug: category.slug },
    }));
  } catch (error) {
    console.warn("API unavailable during build:", error);
    return [];
  }
}
