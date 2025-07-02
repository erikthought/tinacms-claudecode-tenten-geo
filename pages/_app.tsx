import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { TinaEditProvider } from 'tinacms/dist/edit-state'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TinaEditProvider
      editMode={
        <Component {...pageProps} />
      }
    >
      <Component {...pageProps} />
    </TinaEditProvider>
  )
}