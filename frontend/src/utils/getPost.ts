import { PostInterface } from "../interfaces/PostInterface";

export default async function getPost(slug: string): Promise<PostInterface> {
  const res = await fetch(`http://localhost:8000/api/posts/${slug}/`);
  const data = await res.json();
  return data;
}
