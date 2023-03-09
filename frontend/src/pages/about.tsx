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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
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
              </section>

              <section>
                <h2>Experience</h2>
                <ul>
                  <li>
                    Atlanta Hawks – Athletic Trainer and Strength & Conditioning
                    Coach
                  </li>
                  <li>
                    Golden State Warriors – Athletic Trainer and Strength &
                    Conditioning Coach
                  </li>
                  <li>
                    Cressey Sports Performance – Strength & Conditioning Intern
                  </li>
                </ul>
              </section>

              <section>
                <h2>Lecturing</h2>
                <ul>
                  <li>
                    <em>Upcoming:</em> I&apos;ll be speaking at the{" "}
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

              <section>
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
