import './main.css'
import type { AppProps } from 'next/app'

import React from 'react'
import { RecoilRoot } from 'recoil'

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <ErrorBoundary>
    <RecoilRoot>
      {/* <AuthProvider> */}
      {/* <NavBars /> */}
      <div className="container mx-auto h-full">
        <Component {...pageProps} />
        {/* 本来はここだけ(Default) */}
      </div>
      {/* </AuthProvider> */}
    </RecoilRoot>
    // </ErrorBoundary>
  )
}
