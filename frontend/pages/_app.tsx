
import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import '../styles.css'; 
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
  };

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
