import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto_Flex } from "@next/font/google";

const mainFont = Roboto_Flex({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${mainFont.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
