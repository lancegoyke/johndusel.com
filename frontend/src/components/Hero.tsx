import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import pic from "../../public/john-dusel-clapping-on-court-in-red_2000x3000.jpg";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  const [formShown, setFormShown] = useState(true);
  const [successMsgShown, setSuccessMsgShown] = useState(false);
  const [failureMsgShown, setFailureMsgShown] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    const subscribeUrl =
      "https://assets.mailerlite.com/jsonp/363816/forms/82655463782483848/subscribe";

    fetch(subscribeUrl, {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        setFormShown(false);
        setSuccessMsgShown(true);
      } else {
        setFailureMsgShown(true);
      }
    });
  }

  return (
    <div className={styles.heroContainer}>
      <div className={styles.hero}>
        <div className={styles.heroImage}>
          <Image src={pic} alt="John Dusel on basketball court" priority />
        </div>
        <div className={styles.heroContent}>
          <h1>{process.env.SITE_TITLE}</h1>
          <p>
            <strong>
              <em>
                I am an Athletic Trainer and Strength & Conditioning Coach for
                the Atlanta Hawks.
              </em>
            </strong>
          </p>
          <p>
            I write about my experience working along the entire rehabilitation
            to performance spectrum.
          </p>
          <div className={styles.signup}>
            <p className={styles.cta}>
              Sign up to get notified when a new post comes out:
            </p>
            <form
              action=""
              method="post"
              target="_blank"
              className={styles.subscribeForm}
              data-code=""
              onSubmit={handleSubmit}
              style={{ display: formShown ? "block" : "none" }}
            >
              <div className="hidden">
                <input type="hidden" name="ml-submit" value="1" />
                <input type="hidden" name="anticsrf" value="true" />
              </div>
              <div className={styles.shown}>
                <input
                  aria-label="email"
                  aria-required="true"
                  type="email"
                  name="fields[email]"
                  placeholder="you@example.com"
                  autoComplete="email"
                  data-mask=""
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
              <button
                disabled={true}
                style={{ display: "none" }}
                type="button"
                className="loading"
              >
                <div className="ml-form-embedSubmitLoad"></div>
                <span className="sr-only">Loading...</span>
              </button>
            </form>

            <div
              className="successMsg alert success"
              style={{ display: successMsgShown ? "block" : "none" }}
            >
              <div>
                <p>
                  <strong>Thank you!</strong> You have successfully joined our
                  subscriber list.
                </p>
              </div>
            </div>

            <div
              className="failureMsg alert error"
              style={{ display: failureMsgShown ? "block" : "none" }}
            >
              <div>
                <p>
                  <strong>Uh oh!</strong> Something went wrong.
                </p>
              </div>
            </div>
          </div>

          <div className="alert warning">
            <p>
              <em>Upcoming:</em> I&apos;ll be speaking at the{" "}
              <Link href="https://elitebasketballrehabconference.com/">
                Elite Basketball Rehab Conference
              </Link>{" "}
              in July 2023
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
