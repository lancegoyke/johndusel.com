import { TestimonialInterface } from "../interfaces/TestimonialInterface";

export async function getTestimonial(
  slug: string
): Promise<TestimonialInterface> {
  const res = await fetch(`${process.env.BASE_API_URL}/testimonials/${slug}/`);
  if (!res.ok) {
    throw new Error(`API error fetching /testimonials/${slug}/: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data;
}
