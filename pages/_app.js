import '@/styles/globals.css'
import { SocketProvider } from '@/context/socket'
import { FrontFacingProvider } from '@/context/appContext'

export default function App({ Component, pageProps }) {
  return (
    <FrontFacingProvider>
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
    </FrontFacingProvider>)
}
