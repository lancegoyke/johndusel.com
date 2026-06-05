import { TestimonialInterface } from "../interfaces/TestimonialInterface";

// Used by getStaticProps under `output: "export"`. Throw on failure so the
// static build fails loudly rather than baking an empty testimonial.

export async function getTestimonial(
  slug: string
): Promise<TestimonialInterface> {
  const res = await fetch(`${process.env.BASE_API_URL}/testimonials/${slug}/`);
  if (!res.ok) {
    throw new Error(
      `API error fetching /testimonials/${slug}/: ${res.status} ${res.statusText}`
    );
  }
  return await res.json();
}
