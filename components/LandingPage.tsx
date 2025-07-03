import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { tinaField } from 'tinacms/dist/react'
import type { PageQuery } from '../tina/__generated__/types'
import { 
  detectBrowserLanguage, 
  getLanguageConfig, 
  shouldRedirectToDetectedLanguage,
  markLanguageAsChosen,
  supportedLanguages 
} from '../utils/languageDetection'

interface LandingPageProps {
  data: PageQuery['page']
}

export default function LandingPage({ data }: LandingPageProps) {
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState(data.language)
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  // Auto-detect and redirect based on browser language
  useEffect(() => {
    if (isInitialLoad && typeof window !== 'undefined') {
      const redirectPath = shouldRedirectToDetectedLanguage(router.asPath, data.language)
      
      if (redirectPath && redirectPath !== router.asPath) {
        console.log(`Auto-redirecting to ${redirectPath} based on browser language`)
        router.replace(redirectPath)
        return
      }
      
      setIsInitialLoad(false)
    }
  }, [router, data.language, isInitialLoad])

  const handleLanguageChange = (language: string) => {
    // Mark that user has made a language choice
    markLanguageAsChosen()
    
    const langConfig = getLanguageConfig(language)
    router.push(langConfig.path)
  }

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header')
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    const element = document.querySelector(target)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentLangConfig = getLanguageConfig(data.language)

  return (
    <div dir={currentLangConfig.direction}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <h1>TENTEN</h1>
            </div>
            <div className="nav-right">
              <div className="language-selector">
                <select 
                  value={currentLanguage} 
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.nativeName}
                    </option>
                  ))}
                </select>
              </div>
              <a href="https://tenten.co/contact" className="btn btn-primary">
                {data.footer?.contactText || 'CONTACT US'}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="ptcom-design__heroVideoFrame__1q0gmo7">
          <div className="hero-video-container">
            <iframe 
              src="https://player.vimeo.com/video/1098056317?autoplay=1&loop=1&muted=1&controls=0&background=1"
              frameBorder="0" 
              allow="autoplay; fullscreen" 
              allowFullScreen
            />
          </div>
          <div className="hero-video-overlay"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title" {...(data.hero && { 'data-tina-field': tinaField(data.hero, "title") })}>
                {data.hero?.title || 'DOMINATE AI SEARCH RESULTS'}
              </h1>
              <p className="hero-subtitle" {...(data.hero && { 'data-tina-field': tinaField(data.hero, "subtitle") })}>
                {data.hero?.subtitle || 'Future-proof your business with expert GEO services.'}
              </p>
              <div className="hero-stats">
                {data.hero?.stats?.filter((stat): stat is NonNullable<typeof stat> => stat !== null).map((stat, index) => (
                  <div key={index} className="stat">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                )) || []}
              </div>
              <a 
                href="#pricing" 
                className="btn btn-primary btn-large"
                onClick={(e) => smoothScroll(e, '#pricing')}
{...(data.hero && { 'data-tina-field': tinaField(data.hero, "ctaText") })}
              >
                {data.hero?.ctaText || 'START DOMINATING AI SEARCH'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem">
        <div className="container">
          <div className="section-header">
            <h2 {...(data.problem && { 'data-tina-field': tinaField(data.problem, "title") })}>
              {data.problem?.title || 'THE AI SEARCH REVOLUTION IS HERE'}
            </h2>
            <p {...(data.problem && { 'data-tina-field': tinaField(data.problem, "subtitle") })}>
              {data.problem?.subtitle || 'Traditional SEO isn\'t enough anymore.'}
            </p>
          </div>
          <div className="problem-grid">
            {data.problem?.items?.filter((item): item is NonNullable<typeof item> => item !== null).map((item, index) => (
              <div key={index} className="problem-item">
                <h3 {...(item && { 'data-tina-field': tinaField(item, "title") })}>
                  {item.title}
                </h3>
                <p {...(item && { 'data-tina-field': tinaField(item, "description") })}>
                  {item.description}
                </p>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution">
        <div className="container">
          <div className="section-header">
            <h2 {...(data.solution && { 'data-tina-field': tinaField(data.solution, "title") })}>
              {data.solution?.title || 'TENTEN\'S GEO ADVANTAGE'}
            </h2>
            <p {...(data.solution && { 'data-tina-field': tinaField(data.solution, "subtitle") })}>
              {data.solution?.subtitle || 'We\'re the specialists in Generative Engine Optimization.'}
            </p>
          </div>
          <div className="solution-grid">
            {data.solution?.items?.filter((item): item is NonNullable<typeof item> => item !== null).map((item, index) => (
              <div key={index} className="solution-item">
                <div className="solution-icon" {...(item && { 'data-tina-field': tinaField(item, "icon") })}>
                  {item.icon}
                </div>
                <h3 {...(item && { 'data-tina-field': tinaField(item, "title") })}>
                  {item.title}
                </h3>
                <p {...(item && { 'data-tina-field': tinaField(item, "description") })}>
                  {item.description}
                </p>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <h2 {...(data.pricing && { 'data-tina-field': tinaField(data.pricing, "title") })}>
              {data.pricing?.title || 'CHOOSE YOUR GEO PACKAGE'}
            </h2>
            <p {...(data.pricing && { 'data-tina-field': tinaField(data.pricing, "subtitle") })}>
              {data.pricing?.subtitle || 'Invest in your AI search future with our proven GEO strategies'}
            </p>
          </div>
          <div className="pricing-grid">
            {data.pricing?.plans?.filter((plan): plan is NonNullable<typeof plan> => plan !== null).map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.featured ? 'pricing-featured' : ''}`}>
                {plan.badge && (
                  <div className="pricing-badge" {...(plan && { 'data-tina-field': tinaField(plan, "badge") })}>
                    {plan.badge}
                  </div>
                )}
                <div className="pricing-header">
                  <h3 {...(plan && { 'data-tina-field': tinaField(plan, "name") })}>
                    {plan.name}
                  </h3>
                  <div className="price">
                    <span {...(plan && { 'data-tina-field': tinaField(plan, "price") })}>
                      {plan.price}
                    </span>
                    <span {...(plan && { 'data-tina-field': tinaField(plan, "period") })}>
                      {plan.period}
                    </span>
                  </div>
                </div>
                <div className="pricing-features">
                  {plan.features?.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature">
                      {feature}
                    </div>
                  )) || []}
                </div>
                <a 
                  href="https://tenten.co/contact" 
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                  {...(plan && { 'data-tina-field': tinaField(plan, "ctaText") })}
                >
                  {plan.ctaText}
                </a>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <div className="section-header">
            <h2>{data.socialProof?.title || 'TRUSTED BY FORWARD-THINKING BRANDS'}</h2>
            <p>{data.socialProof?.subtitle || 'Join companies that are already winning in the AI search era'}</p>
          </div>
          <div className="social-proof-stats">
            {data.socialProof?.stats?.filter((stat): stat is NonNullable<typeof stat> => stat !== null).map((stat, index) => (
              <div key={index} className="social-stat">
                <div className="social-number">{stat.number}</div>
                <div className="social-label">{stat.label}</div>
              </div>
            )) || []}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>{data.finalCta?.title || 'DON\'T GET LEFT BEHIND IN THE AI SEARCH REVOLUTION'}</h2>
            <p>{data.finalCta?.subtitle || 'Your competitors are already optimizing for AI search.'}</p>
            <a href="https://tenten.co/contact" className="btn btn-primary btn-large">
              {data.finalCta?.ctaText || 'START YOUR GEO STRATEGY TODAY'}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-left">
              <div className="logo">TENTEN</div>
              <p>{data.footer?.tagline || 'Leading the future of AI search optimization'}</p>
              
              {/* Social Media Links */}
              <div className="social-links">
                <a href="https://tenten.co/" target="_blank" rel="noopener noreferrer" aria-label="Website">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/tenten.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.threads.com/@tenten.co" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.5 1.5 5.78 6.056 1 12.186 1S22.5 5.78 22.5 12.5c0 3.086-.85 5.94-2.495 8.005-1.85 2.304-4.603 3.485-8.184 3.509zM12.186 2.5c-5.333 0-9.686 4.088-9.686 10s4.353 10 9.686 10c5.334 0 9.686-4.088 9.686-10s-4.352-10-9.686-10z"/>
                    <path d="M17.5 12.5c0 2.485-2.239 4.5-5 4.5s-5-2.015-5-4.5 2.239-4.5 5-4.5 5 2.015 5 4.5z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/tentencreative" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@tenten.ai" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@tenten_ai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/tentenco/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://www.xiaohongshu.com/user/profile/606abf99000000000101c0a0?xsec_token=&xsec_source=pc_search" target="_blank" rel="noopener noreferrer" aria-label="Red Note">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.605-2.068 4.777-1.172 1.172-2.919 1.899-4.777 2.068-1.858-.169-3.605-.896-4.777-2.068C4.774 11.765 4.047 10.018 4.216 8.16c.169-1.858.896-3.605 2.068-4.777C7.456 2.211 9.203 1.484 11.061 1.653c1.858.169 3.605.896 4.777 2.068 1.172 1.172 1.899 2.919 1.73 4.777z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </a>
                <a href="https://linktr.ee/tenten.co" target="_blank" rel="noopener noreferrer" aria-label="Linktree">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.953 15.066c-.08.163-.08.324-.08.486.08.517.528.897 1.052.89h1.294v4.776c0 .486-.404.89-.89.89H6.577c-.486 0-.89-.404-.89-.89v-4.776h1.294c.525.007.973-.373 1.052-.89.081-.162.081-.323 0-.486zm8.094 0c-.08.163-.08.324 0 .486.08.517.528.897 1.052.89h1.294v4.776c0 .486-.404.89-.89.89h-2.752c-.486 0-.89-.404-.89-.89v-4.776h1.294c.525.007.973-.373 1.052-.89.081-.162.081-.323.08-.486zM12 9.095l-7.183 7.183c-.347.347-.347.91 0 1.257.347.346.91.346 1.257 0L12 11.609l5.926 5.926c.347.346.91.346 1.257 0 .346-.347.346-.91 0-1.257L12 9.095zm0-7.183c-.486 0-.89.404-.89.89v4.776L5.184 1.652c-.347-.346-.91-.346-1.257 0-.346.347-.346.91 0 1.257l5.926 5.926v4.776c0 .486.404.89.89.89s.89-.404.89-.89V8.835l5.926-5.926c.346-.347.346-.91 0-1.257-.347-.346-.91-.346-1.257 0l-5.926 5.926V1.912c0-.486-.404-.89-.89-.89z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-right">
              <a href="https://tenten.co/contact" className="btn btn-secondary">
                {data.footer?.contactText || 'CONTACT US'}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}