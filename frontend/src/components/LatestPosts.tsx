import Link from "next/link";
import PostMeta from "../components/PostMeta";
import styles from "../styles/LatestPosts.module.css";
import { PostInterface } from "../interfaces/PostInterface";

export default function LatestPosts({ posts }: { posts: PostInterface[] }) {
  return (
    <section className={`stack stack-loose ${styles.content}`}>
      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <article className={styles.article} key={post.slug}>
          <h3>
            <Link href={post.slug}>{post.title}</Link>
          </h3>
          <PostMeta categories={post.categories} date={post.created_at} />
        </article>
      ))}
    </section>
  );
}
