import { TestimonialInterface } from "../interfaces/TestimonialInterface";

const emptyTestimonial: TestimonialInterface = {
  id: 0,
  name: "",
  slug: "",
  body: "",
  title: "",
  company: "",
  created_at: "",
  updated_at: "",
};

export async function getTestimonial(
  slug: string
): Promise<TestimonialInterface> {
  try {
    const res = await fetch(`${process.env.BASE_API_URL}/testimonials/${slug}/`);
    if (!res.ok) {
      console.warn(`API error fetching /testimonials/${slug}/: ${res.status} ${res.statusText}`);
      return emptyTestimonial;
    }
    return await res.json();
  } catch (error) {
    console.warn("API unavailable, returning empty testimonial:", error);
    return emptyTestimonial;
  }
}
