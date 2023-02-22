import '@/styles/globals.css';
import type { AppProps } from 'next/app'
import { store } from '@/redux/store';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <Provider store = { store }>
      <PayPalScriptProvider options={{'client-id':'ASvBKx9IEisRdkw1zI3jkDsS6HUEmzz5Whu-qZg5zZc2qYCwxQdGYiPNKR-t3aB8I4HQRFyRlrgs--ak'}}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </Provider>  
  )
}
