// import { Html, Head, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html lang="en">
//       <Head />
//       <body>
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }



import Document, { Html, Head, Main, NextScript } from "next/document";


// import Head from "next/head";

// Define metadata as a plain JavaScript object
export const metadata = {
  title: {
    default: "Let's write a blog XL",
    template: "%s - BlogXL"
  },
  description: "Come and write blogs in BlogXL",
  twitter: {
    card: "summary_large_image",
  }
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        
        <Head>
        <title>{metadata.title.default}</title>
        <meta name="description" content={metadata.description} />
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta name="twitter:description" content={metadata.twitter.description} />
        <meta name="twitter:image" content={metadata.twitter.image} />
      </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
