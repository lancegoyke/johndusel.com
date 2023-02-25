import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Date from "../../components/Date";
import {
  CategoryInterface,
  PostInterface,
} from "../../interfaces/PostInterface";
import { getCategoryBySlug, getPostsByCategory } from "@/utils/getPosts";
import { getPostCategorySlugs } from "@/utils/getPostSlugs";

export default function CategoryPostList({
  category,
  posts,
}: {
  category: CategoryInterface;
  posts: PostInterface[];
}) {
  return (
    <>
      <Head>
        <title>{category.name}</title>
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
            <h1>{category.name}</h1>
            <div className="articles">
              {posts.map((post) => (
                <article key={post.slug}>
                  <Link href={`/${post.slug}`}>
                    <h2>{post.title}</h2>
                  </Link>
                  <br />
                  <div className="post-meta">
                    <Date dateString={post.created_at} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostCategorySlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch all posts in the category
  const category = await getCategoryBySlug(params?.slug as string);
  const posts = await getPostsByCategory(params?.slug as string);
  return {
    props: {
      category,
      posts,
    },
  };
};
