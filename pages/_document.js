import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

// HTML DOM custom structure.
export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <div id='overlays'></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
