import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Professional work in an impressive field" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <div>
          <div className="center">
            <div className="stack-recursive">
              <h1>About</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
