import { Html, Head, Main, NextScript } from "next/document";

// HTML DOM custom structure.
const Document = () => {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="overlays"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
