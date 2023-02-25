import { CategoryInterface, PostInterface } from "../interfaces/PostInterface";

type PostSlug = {
  params: {
    slug: string;
  };
};

export async function getPostSlugs(): Promise<PostSlug[]> {
  const res = await fetch("http://localhost:8000/api/posts/");
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
    `http://localhost:8000/api/posts/category/${categorySlug}/`
  );
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
  const res = await fetch("http://localhost:8000/api/categories/");
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
