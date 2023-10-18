import React from 'react';
import Head from 'next/head';

import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>Discord Servers Tracker</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>
      <div className="container mx-auto py-12">
        <Component {...pageProps} />
        <CallToAction/>
        <Footer/>
      </div>
    </div>);
}

export default MyApp;