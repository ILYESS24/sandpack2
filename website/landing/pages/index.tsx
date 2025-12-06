import type { NextPage } from "next";
import Head from "next/head";

import { AdvancedUsage } from "../components/AdvancedUsage";
import { Banner } from "../components/Banner";
import { Community } from "../components/Community";
import { Features } from "../components/Features";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Intro } from "../components/Intro";
import { Showcase } from "../components/Showcase";
import { Users } from "../components/Users";
import { ClipboardProvider } from "../components/common";
import { styled } from "../stitches.config";
import content from "../website.config.json";

const DEFAULT_HOST = "https://sandpack.codesandbox.io";

const Container = styled("section", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: "100vh",
});

const Main = styled("main", {
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

interface HomeProps {
  host: string | undefined;
}
const Home: NextPage<HomeProps> = () => {
  const { global, meta } = content;

  return (
    <Container>
      <Head>
        <title>{global.title}</title>
        <meta content={global.description} name="description" />
        <link href="/favicon.ico" rel="icon" />

        {/* Open Graph */}
        {meta.map(({ name, value }) => {
          let content = value;

          if (name === "og:url") {
            content = DEFAULT_HOST;
          } else if (name === "og:image") {
            content = `${DEFAULT_HOST}/${content}`;
          }

          return <meta key={name} content={content} name={name} />;
        })}
      </Head>

      <ClipboardProvider>
        <Main>
          <div style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#0070f3",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}>
            🤖 Version avec Assistant IA
          </div>
          <Hero />
          <Features />
          <Intro />
          <AdvancedUsage />
          <Showcase />
          <Users />
          <Banner />
          <Community />
        </Main>
        <Footer />
      </ClipboardProvider>
    </Container>
  );
};

export default Home;
