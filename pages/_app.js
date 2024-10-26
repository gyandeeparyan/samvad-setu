import '@/styles/globals.css'
import { SocketProvider } from '@/context/socket'
import { FrontFacingProvider } from '@/context/appContext'



export const metadata = {
  title: "Samvad Setu",
  description: "Samvad Setu",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
};

export default function App({ Component, pageProps }) {
  return (
    <FrontFacingProvider>
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
    </FrontFacingProvider>)
}
