import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import getPosts from '../lib/getPosts'

interface Posts {
  posts: [
    post: {
      id: number,
      title: string,
      slug: string,
      author: {
        id: number,
        name: string,
        email: string,
        username: string,
      },
      content: string,
      created_at: string,
      updated_at: string,
    }
  ];
}

export default function Home({ posts }: Posts) {
  return (
    <>
      <Head>
        <title>Admin User</title>
        <meta name="description" content="Professional work in an impressive field" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <Navbar />
          <Hero />

          <div className={styles.contentContainer}>
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPosts()
  return {
    props: { posts },
  }
}

