import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import getPostSlugs from "../lib/getPostSlugs";
import getPost from "../lib/getPost";
import PostInterface from "../interfaces/PostInterface";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({ post }: { post: PostInterface }) {
  console.log(post);
  return (
    <>
      <Head>
        <title>{post.title}</title>
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
          <div className="center max-inline-size:large">
            <h1>{post.title}</h1>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for slug
  const paths = await getPostSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch the blog post using params.slug
  const post = await getPost(params?.slug as string);
  return {
    props: {
      post,
    },
  };
};
