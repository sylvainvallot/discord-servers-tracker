import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer';
import CallToAction from '../components/CallToAction';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto py-12">
      <Component {...pageProps} />
      <CallToAction/>
      <Footer/>
    </div>);
}

export default MyApp;