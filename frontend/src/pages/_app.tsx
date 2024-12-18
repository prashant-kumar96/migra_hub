import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { Component, ErrorInfo, ReactNode } from 'react';

// Define the ErrorBoundary component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
     console.error("Caught error in ErrorBoundary:", error, errorInfo);
    this.setState({errorInfo:errorInfo})

  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ padding: "20px", border: '1px solid red', backgroundColor: '#f9f9f9', fontFamily: 'sans-serif'}}>
            <h2 style={{color:"red"}}>Something went wrong.</h2>
          <p>
          An unexpected error occurred in the application.
          </p>
          {this.state.error && <pre style={{backgroundColor:"#fff",padding:"10px", overflow: "auto" , border:"1px solid #eee"}}>
            {this.state.error.message}
            
             </pre> }
          {this.state.errorInfo && <details>
            <summary style={{cursor:"pointer"}}>Details</summary>
            <pre style={{backgroundColor:"#fff",padding:"10px", overflow: "auto" , border:"1px solid #eee"}}>
          {this.state.errorInfo.componentStack}
           </pre>
          </details> }
           
        </div>
      );
    }

    return this.props.children;
  }
}



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      {/* <Head>
        <Link
         href="https://your-font-source.com/greycliff-cf.css"
          rel="stylesheet"
        />
      </Head> */}
      <ErrorBoundary>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ErrorBoundary>
    </>
  );
}