import { TestimonialInterface } from "../interfaces/TestimonialInterface";

export async function getTestimonial(
  slug: string
): Promise<TestimonialInterface> {
  const res = await fetch(`${process.env.BASE_API_URL}/testimonials/${slug}/`);
  const data = await res.json();
  return data;
}
