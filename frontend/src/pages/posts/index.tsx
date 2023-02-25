import Head from "next/head";
import Link from "next/link";
import { GetStaticProps } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";
import Date from "../../components/Date";
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
        <title>All Posts</title>
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
          <div className="center stack-recursive">
            <h1>All Posts</h1>
            <div className="articles">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link href={`/${post.slug}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <br />
                  <div className="post-meta">
                    <Date dateString={post.created_at} />
                    {post.categories && (
                      <Categories categories={post.categories} />
                    )}
                  </div>
                </article>
              ))}
            </div>
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
