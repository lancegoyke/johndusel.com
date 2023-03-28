import { TestimonialInterface } from "../interfaces/TestimonialInterface";

export default function Testimonial({
  testimonial,
}: {
  testimonial: TestimonialInterface;
}) {
  return (
    <section className={`testimonial`}>
      <div
        className="stack testimonial-body"
        dangerouslySetInnerHTML={{ __html: testimonial.body }}
      ></div>

      <div className="stack testimonial-byline">
        <span className="name">{testimonial.name}</span>
        {testimonial.title && (
          <span className="title">{testimonial.title}</span>
        )}
        {testimonial.company && (
          <span className="company">{testimonial.company}</span>
        )}
      </div>
    </section>
  );
}
