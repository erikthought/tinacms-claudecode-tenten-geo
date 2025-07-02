import '../styles/globals.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const TinaProvider = dynamic(() => import('../components/TinaProvider'), {
  ssr: false,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TinaProvider>
      <Component {...pageProps} />
    </TinaProvider>
  )
}