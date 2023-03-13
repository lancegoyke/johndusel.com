import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostMeta from "../../components/PostMeta";
import {
  CategoryInterface,
  PostInterface,
} from "../../interfaces/PostInterface";
import { getPosts } from "@/utils/getPosts";

export default function CategoryPostList({
  posts,
}: {
  category: CategoryInterface;
  posts: PostInterface[];
}) {
  return (
    <>
      <Head>
        <title>Latest Posts</title>
        <meta
          name="description"
          content="Latest writing about high performance athletics from John Dusel"
        />
      </Head>
      <Navbar />
      <main>
        <div className="center stack-recursive stack-recursive-loose">
          <h1>Latest Posts</h1>
          <div className="articles">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <div className="post-meta">
                  <PostMeta
                    categories={post.categories}
                    date={post.created_at}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Fetch all posts in the category
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
};
