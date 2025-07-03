import Head from 'next/head'
import { ReactNode } from 'react'
import { getLanguageConfig } from '../utils/languageDetection'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  language?: string
}

export default function Layout({ 
  children, 
  title = "Tenten - Generative Engine Optimization (GEO) Services",
  description = "Dominate AI search results with Tenten's expert GEO services. Optimize for ChatGPT, Gemini, and other AI platforms to maximize your visibility.",
  language = "en"
}: LayoutProps) {
  const langConfig = getLanguageConfig(language)
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content={language} />
        <link rel="icon" href="/favicon.ico" />
        <html lang={language} dir={langConfig.direction} />
      </Head>
      <div lang={language} dir={langConfig.direction}>
        {children}
      </div>
    </>
  )
}