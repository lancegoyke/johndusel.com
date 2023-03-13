import Head from "next/head";
import Link from "next/link";
import { GetStaticPaths, GetStaticProps } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PostMeta from "../../components/PostMeta";
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
        <title>Posts About {category.name}</title>
        <meta
          name="description"
          content={`Writing related to ${category.name}`}
        />
      </Head>
      <Navbar />
      <main>
        <div className="center stack-recursive">
          <h1>
            Posts About <em>{category.name}</em>
          </h1>
          <div className="articles">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link href={`/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <PostMeta date={post.created_at} />
              </article>
            ))}
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
