import { PostInterface } from "../interfaces/PostInterface";

export default async function getPost(slug: string): Promise<PostInterface> {
  const res = await fetch(`${process.env.BASE_API_URL}/posts/${slug}/`);
  const data = await res.json();
  return data;
}
