import { PostInterface } from "../interfaces/PostInterface";

export default async function getPost(slug: string): Promise<PostInterface> {
  const res = await fetch(`${process.env.BASE_API_URL}/posts/${slug}/`);
  if (!res.ok) {
    throw new Error(`API error fetching /posts/${slug}/: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}
