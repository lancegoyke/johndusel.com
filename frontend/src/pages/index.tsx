import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LatestPosts from "../components/LatestPosts";
import Footer from "../components/Footer";
import getLatestPosts from "../lib/getLatestPosts";
import PostInterface from "../interfaces/PostInterface";
import { GetStaticProps } from "next";

export default function Home({ posts }: { posts: PostInterface[] }) {
  return (
    <>
      <Head>
        <title>Admin User</title>
        <meta
          name="description"
          content="Professional work in an impressive field"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div>
          <Hero />
          <div className="center max-inline-size:large">
            <LatestPosts posts={posts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getLatestPosts();
  return {
    props: { posts },
  };
};
