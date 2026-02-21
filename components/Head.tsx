import Head from "next/head";

const Header = () => {
  return (
    <Head>
      <title>remoet.dev API documentation</title>
      <meta name="description" content="remoet.dev API documentation. " />

      <link rel="canonical" href="https://www.docs.remoet.dev" />
      <link rel="icon" href="/favicon.ico" />

      <meta httpEquiv="content-language" content="en-us" />

      <meta
        property="og:title"
        content="Fully remote companies hiring in 2026 - remoet.dev"
      />
      <meta property="og:description" content="remoet.dev documentation" />
      <meta property="og:url" content="https://www.remoet.dev" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@remoet_dev" />
      <meta name="twitter:title" content="remoet.dev API documentation" />
      <meta name="twitter:description" content="remoet.dev API documentation" />
    </Head>
  );
};

export default Header;
