import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import {AuthContext} from '@/context/Context'
import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [userInfos,setUserInfos] = useState({})

  return(
    // <AuthContext.Provider value={{userInfos,setUserInfos}}>
       <Component {...pageProps} />
    // </AuthContext.Provider>
  )
}
