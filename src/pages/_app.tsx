import '../styles/globals.css'
import type { AppProps } from 'next/app'

import React from 'react'
import { RecoilRoot } from 'recoil'
// import AuthProvider from '../components/provider/AuthProvider'
// import ErrorBoundary from 'components/shared/error/ErrorBoundary'
// import NavBars from 'components/atomic/Organisms/NavBars'

import '../components/atomic/Atoms/css/stamprally/main.css';
import '../components/atomic/Atoms/css/stamprally/reset.css';

export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    // <ErrorBoundary>
      <RecoilRoot>
        {/* <AuthProvider> */}
          {/* <NavBars /> */}
          <div className="container mx-auto h-full">
            <Component {...pageProps} />{/* 本来はここだけ(Default) */}
          </div>
        {/* </AuthProvider> */}
      </RecoilRoot>
    // </ErrorBoundary>
  )
}
