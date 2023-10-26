import Link from "next/link";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta
          name="description"
          content="I am an Athletic Trainer and Strength & Conditioning Coach for the Atlanta Hawks"
        />
      </Head>
      <Navbar />
      <main id="about">
        <div>
          <div className="center">
            <div className="stack-recursive">
              <h1>About</h1>
              <section>
                <p>
                  I am an Athletic Trainer and Strength & Conditioning Coach for
                  the Atlanta Hawks.
                </p>
                <p>
                  I have experience working along the entire rehabilitation to
                  performance spectrum. I pride myself in being a good teammate
                  and consistently working to improve at my craft.
                </p>
                <p>
                  I was fortunate enought to be a part of the Golden State
                  Warriors{" "}
                  <Link href="https://twitter.com/ATLHawks/status/1062539016992579584/photo/1">
                    championship team
                  </Link>
                  .
                </p>
              </section>

              <section id="experience">
                <h2>Experience</h2>
                <article>
                  <h3>Atlanta Hawks</h3>
                  <p>
                    2018 - Present: Athletic Trainer and Strength & Conditioning
                    Coach
                  </p>
                </article>
                <article>
                  <h3>Golden State Warriors</h3>
                  <p>
                    2017 - 2018: Athletic Trainer and Strength & Conditioning
                    Coach
                  </p>
                  <p>2016 - 2017: Performance Intern</p>
                </article>
                <article>
                  <h3>Cressey Sports Performance</h3>
                  <p>2016: Strength & Conditioning Intern</p>
                </article>
              </section>

              <section id="lecturing">
                <h2>Lecturing</h2>
                <ul>
                  <li>
                    I spoke at the{" "}
                    <Link href="https://elitebasketballrehabconference.com/">
                      Elite Basketball Rehab Conference
                    </Link>{" "}
                    in July 2023
                  </li>
                  <li>
                    Presented staff in-services on return-to-play protocols and
                    biomechanics of landing
                  </li>
                </ul>
              </section>

              <section id="education">
                <h2>Education</h2>
                <ul>
                  <li>Certified Athletic Trainer</li>
                  <li>
                    Master&apos;s Degree in Sport Science and Coach Education
                    from East Tennessee State University
                  </li>
                  <li>
                    Bachelor&apos;s Degree in Athletic Training from University
                    of New England
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
