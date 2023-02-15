import styles from '../styles/Posts.module.css'
import PostsInterface from '../interfaces/PostsInterface'

export default function Posts({ posts }: PostsInterface) {
  return (
    <section className={styles.content}>
      <h2>Latest Posts</h2>
      {posts.map((post) => (
        <article className={styles.article}>
          <h3>{post.title}</h3>
          <p>{post.created_at.slice(0, 10)}</p>
          <p><span className={styles.category}>CATEGORY</span></p>
        </article>
      ))}
    </section>
  )
}
