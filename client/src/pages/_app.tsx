import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import { AuthContext } from '@/context/Context'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [userDetails, setUserDetails]= useState({})
  return(
    <AuthContext.Provider value={{userDetails:userDetails, setUserDetails:setUserDetails}}>
      <Component {...pageProps} />
    </AuthContext.Provider>    
  )
}
