import { CategoryInterface, PostInterface } from "../interfaces/PostInterface";

type PostSlug = {
  params: {
    slug: string;
  };
};

export async function getPostSlugs(): Promise<PostSlug[]> {
  const res = await fetch(`${process.env.BASE_API_URL}/posts/`);
  if (!res.ok) {
    throw new Error(`API error fetching /posts/: ${res.status} ${res.statusText}`);
  }
  const data: PostInterface[] = await res.json();
  // Filter the data to only include the slugs
  return data.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

export async function getPostSlugsByCategory(
  categorySlug: string
): Promise<PostSlug[]> {
  const res = await fetch(
    `${process.env.BASE_API_URL}/posts/category/${categorySlug}/`
  );
  if (!res.ok) {
    throw new Error(`API error fetching /posts/category/${categorySlug}/: ${res.status} ${res.statusText}`);
  }
  const data: PostInterface[] = await res.json();
  // Filter the data to only include the slugs
  return data.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
}

export async function getPostCategorySlugs(): Promise<PostSlug[]> {
  const res = await fetch(`${process.env.BASE_API_URL}/categories/`);
  if (!res.ok) {
    throw new Error(`API error fetching /categories/: ${res.status} ${res.statusText}`);
  }
  const data: CategoryInterface[] = await res.json();
  // Filter the data to only include the slugs
  return data.map((category) => {
    return {
      params: {
        slug: category.slug,
      },
    };
  });
}
