import { TestimonialInterface } from "../interfaces/TestimonialInterface";

export default function Testimonial({
  testimonials,
}: {
  testimonials: TestimonialInterface[];
}) {
  return (
    <section className={`testimonials`}>
      {testimonials.map((testimonial) => (
        <article className="testimonial" key={testimonial.slug}>
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
        </article>
      ))}
    </section>
  );
}
