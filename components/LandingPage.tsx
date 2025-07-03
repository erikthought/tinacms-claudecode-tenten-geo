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
                  🌐
                </a>
                <a href="https://www.instagram.com/tenten.co/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  📷
                </a>
                <a href="https://www.threads.com/@tenten.co" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                  🧵
                </a>
                <a href="https://www.facebook.com/tentencreative" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  📘
                </a>
                <a href="https://www.tiktok.com/@tenten.ai" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  🎵
                </a>
                <a href="https://www.youtube.com/@tenten_ai" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  📺
                </a>
                <a href="https://www.linkedin.com/company/tentenco/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  💼
                </a>
                <a href="https://www.xiaohongshu.com/user/profile/606abf99000000000101c0a0?xsec_token=&xsec_source=pc_search" target="_blank" rel="noopener noreferrer" aria-label="Red Note">
                  📝
                </a>
                <a href="https://linktr.ee/tenten.co" target="_blank" rel="noopener noreferrer" aria-label="Linktree">
                  🌳
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