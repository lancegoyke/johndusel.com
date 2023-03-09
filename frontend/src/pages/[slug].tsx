import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PostMeta from "../components/PostMeta";
import { getPostSlugs } from "../utils/getPostSlugs";
import getPost from "../utils/getPost";
import { PostInterface } from "../interfaces/PostInterface";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Post({ post }: { post: PostInterface }) {
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
        <div className="center stack-recursive">
          <h1>{post.title}</h1>
          <PostMeta categories={post.categories} date={post.created_at} />
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
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
  const post = await getPost(params?.slug as string);
  return {
    props: {
      post,
    },
  };
};
