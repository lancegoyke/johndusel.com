import Head from "next/head";
import { GetStaticProps } from "next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";
import { getLatestPosts } from "../utils/getPosts";
import { PostInterface } from "../interfaces/PostInterface";
import { generateRssFeed } from "@/utils/generateRssFeed";

export default function Home({ posts }: { posts: PostInterface[] }) {
  return (
    <>
      <Head>
        <title>{process.env.SITE_TITLE}</title>
        <meta name="description" content={process.env.SITE_DESCRIPTION} />
      </Head>
      <Navbar showLogo={false} />
      <main>
        <Hero />
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
  return {
    props: { posts },
  };
};
