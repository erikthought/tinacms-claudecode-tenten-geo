import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface PageData {
  title: string
  description: string
  language: string
  hero: {
    title: string
    subtitle: string
    ctaText: string
    stats: Array<{
      number: string
      label: string
    }>
  }
  problem: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
    }>
  }
  solution: {
    title: string
    subtitle: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  pricing: {
    title: string
    subtitle: string
    plans: Array<{
      name: string
      price: string
      period: string
      featured?: boolean
      badge?: string
      features: string[]
      ctaText: string
    }>
  }
  socialProof: {
    title: string
    subtitle: string
    stats: Array<{
      number: string
      label: string
    }>
  }
  finalCta: {
    title: string
    subtitle: string
    ctaText: string
  }
  footer: {
    tagline: string
    contactText: string
  }
}

interface LandingPageProps {
  data: PageData
}

export default function LandingPage({ data }: LandingPageProps) {
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState(data.language)

  const handleLanguageChange = (language: string) => {
    const languagePages: { [key: string]: string } = {
      'en': '/',
      'ja': '/ja',
      'zh-cn': '/zh-cn',
      'zh-tw': '/zh-tw',
      'ko': '/ko',
      'ar': '/ar'
    }
    
    if (languagePages[language]) {
      router.push(languagePages[language])
    }
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

  return (
    <div dir={data.language === 'ar' ? 'rtl' : 'ltr'}>
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
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                  <option value="zh-cn">简体中文</option>
                  <option value="zh-tw">繁體中文</option>
                  <option value="ko">한국어</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
              <a href="https://tenten.co/contact" className="btn btn-primary">
                {data.footer.contactText}
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
              <h1 className="hero-title">{data.hero.title}</h1>
              <p className="hero-subtitle">{data.hero.subtitle}</p>
              <div className="hero-stats">
                {data.hero.stats.map((stat, index) => (
                  <div key={index} className="stat">
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
              <a 
                href="#pricing" 
                className="btn btn-primary btn-large"
                onClick={(e) => smoothScroll(e, '#pricing')}
              >
                {data.hero.ctaText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem">
        <div className="container">
          <div className="section-header">
            <h2>{data.problem.title}</h2>
            <p>{data.problem.subtitle}</p>
          </div>
          <div className="problem-grid">
            {data.problem.items.map((item, index) => (
              <div key={index} className="problem-item">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="solution">
        <div className="container">
          <div className="section-header">
            <h2>{data.solution.title}</h2>
            <p>{data.solution.subtitle}</p>
          </div>
          <div className="solution-grid">
            {data.solution.items.map((item, index) => (
              <div key={index} className="solution-item">
                <div className="solution-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing" id="pricing">
        <div className="container">
          <div className="section-header">
            <h2>{data.pricing.title}</h2>
            <p>{data.pricing.subtitle}</p>
          </div>
          <div className="pricing-grid">
            {data.pricing.plans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.featured ? 'pricing-featured' : ''}`}>
                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="price">{plan.price}<span>{plan.period}</span></div>
                </div>
                <div className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="feature">{feature}</div>
                  ))}
                </div>
                <a 
                  href="https://tenten.co/contact" 
                  className={`btn ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                >
                  {plan.ctaText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <div className="section-header">
            <h2>{data.socialProof.title}</h2>
            <p>{data.socialProof.subtitle}</p>
          </div>
          <div className="social-proof-stats">
            {data.socialProof.stats.map((stat, index) => (
              <div key={index} className="social-stat">
                <div className="social-number">{stat.number}</div>
                <div className="social-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>{data.finalCta.title}</h2>
            <p>{data.finalCta.subtitle}</p>
            <a href="https://tenten.co/contact" className="btn btn-primary btn-large">
              {data.finalCta.ctaText}
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
              <p>{data.footer.tagline}</p>
            </div>
            <div className="footer-right">
              <a href="https://tenten.co/contact" className="btn btn-secondary">
                {data.footer.contactText}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}