import Head from "next/head";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";
import { getLatestPosts } from "../utils/getPosts";
import { PostInterface } from "../interfaces/PostInterface";
import { TestimonialInterface } from "@/interfaces/TestimonialInterface";
import { generateRssFeed } from "@/utils/generateRssFeed";
import { getTestimonial } from "@/utils/getTestimonials";

export default function Home({
  posts,
  testimonial,
}: {
  posts: PostInterface[];
  testimonial: TestimonialInterface;
}) {
  return (
    <>
      <Head>
        <title>{process.env.SITE_TITLE}</title>
        <meta name="description" content={process.env.SITE_DESCRIPTION} />
      </Head>
      <Navbar showLogo={false} />
      <main>
        <Hero />
        {testimonial.name && <Testimonial testimonial={testimonial} />}
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
  const testimonial = await getTestimonial("chelsea-lane");
  console.log(`Testimonial: ${testimonial.name}`);
  return {
    props: { posts, testimonial },
  };
};
