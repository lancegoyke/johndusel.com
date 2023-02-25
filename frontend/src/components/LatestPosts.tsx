import Categories from "../components/Categories";
import Date from "../components/Date";
import styles from "../styles/LatestPosts.module.css";
import { PostInterface } from "../interfaces/PostInterface";

export default function LatestPosts({ posts }: { posts: PostInterface[] }) {
  return (
    <section className={styles.content}>
      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <article className={styles.article}>
          <h3>{post.title}</h3>
          <div className="post-meta">
            <Date dateString={post.created_at} />
            {post.categories && <Categories categories={post.categories} />}
          </div>
        </article>
      ))}
    </section>
  );
}
