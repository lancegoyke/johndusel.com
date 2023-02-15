import Head from 'next/head'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Posts from '../components/Posts'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import getPosts from '../lib/getPosts'
import PostsInterface from '../interfaces/PostsInterface'

export default function Home({ posts }: PostsInterface) {
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
            <Posts posts={posts} />
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
