import Head from "next/head";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";
import { getLatestPosts } from "../utils/getPosts";
import { PostInterface } from "../interfaces/PostInterface";
import { TestimonialInterface } from "@/interfaces/TestimonialInterface";
import { generateRssFeed } from "@/utils/generateRssFeed";
import { getTestimonial } from "@/utils/getTestimonials";
import pic from "../../public/john-dusel-clapping-on-court-in-red_2000x3000.jpg";

export default function Home({
  posts,
  testimonials,
}: {
  posts: PostInterface[];
  testimonials: TestimonialInterface[];
}) {
  return (
    <>
      <Head>
        <title>{process.env.SITE_TITLE}</title>
        <meta name="description" content={process.env.SITE_DESCRIPTION} />
        <meta property="og:title" content={process.env.SITE_TITLE} />
        <meta
          property="og:description"
          content={process.env.SITE_DESCRIPTION}
        />
        <meta property="og:image" content={pic.src} />
      </Head>
      <Navbar showLogo={false} />
      <main>
        <Hero />
        {testimonials[0].name && <Testimonials testimonials={testimonials} />}
        <div className="center max-inline-size:large">
          <LatestPosts posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  await generateRssFeed();
  const posts = await getLatestPosts();
  const testimonial1 = await getTestimonial("chelsea-lane");
  const testimonial2 = await getTestimonial("dr-kyle-hammond");
  const testimonial3 = await getTestimonial("nick-van-exel");
  return {
    props: { posts, testimonials: [testimonial1, testimonial2, testimonial3] },
  };
};
