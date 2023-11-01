import type { AppProps } from 'next/app';

import Head from 'next/head';
import React from 'react';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Discord Servers Tracker</title>
        <link href="/images/favicon.ico" rel="shortcut icon" />
        <link href="/images/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/images/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png"/>
        <link href="/images/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png"/>
        <link href="/site.webmanifest" rel="manifest"/>
      </Head>
      <div className="container mx-auto py-12">
        <Component {...pageProps} />
      </div>
    </div>);
}

export default MyApp;