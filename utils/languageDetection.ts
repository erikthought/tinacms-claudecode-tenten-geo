export interface LanguageConfig {
  code: string
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  path: string
}

export const supportedLanguages: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    path: '/'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    path: '/ja'
  },
  {
    code: 'zh-cn',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    direction: 'ltr',
    path: '/zh-cn'
  },
  {
    code: 'zh-tw',
    name: 'Chinese (Traditional)',
    nativeName: '繁體中文',
    direction: 'ltr',
    path: '/zh-tw'
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    direction: 'ltr',
    path: '/ko'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    path: '/ar'
  }
]

export function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language || navigator.languages?.[0] || 'en'
  
  // Map browser language codes to our supported languages
  const langMap: { [key: string]: string } = {
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'ja': 'ja',
    'ja-JP': 'ja',
    'zh': 'zh-cn',
    'zh-CN': 'zh-cn',
    'zh-TW': 'zh-tw',
    'zh-HK': 'zh-tw',
    'ko': 'ko',
    'ko-KR': 'ko',
    'ar': 'ar',
    'ar-SA': 'ar',
    'ar-EG': 'ar',
    'ar-AE': 'ar'
  }
  
  // Try exact match first
  if (langMap[browserLang]) {
    return langMap[browserLang]
  }
  
  // Try language without region (e.g., 'zh' from 'zh-HK')
  const langWithoutRegion = browserLang.split('-')[0]
  if (langMap[langWithoutRegion]) {
    return langMap[langWithoutRegion]
  }
  
  // Default to English
  return 'en'
}

export function getLanguageConfig(langCode: string): LanguageConfig {
  return supportedLanguages.find(lang => lang.code === langCode) || supportedLanguages[0]
}

export function shouldRedirectToDetectedLanguage(currentPath: string, currentLang: string): string | null {
  const detectedLang = detectBrowserLanguage()
  
  // Don't redirect if already on the detected language
  if (currentLang === detectedLang) return null
  
  // Don't redirect if user has already made a language choice (has visited other pages)
  if (typeof window !== 'undefined' && sessionStorage.getItem('language-chosen')) {
    return null
  }
  
  // Only redirect on the home page to avoid interrupting user navigation
  if (currentPath !== '/' && currentPath !== '') return null
  
  const targetLangConfig = getLanguageConfig(detectedLang)
  return targetLangConfig.path
}

export function markLanguageAsChosen(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('language-chosen', 'true')
  }
}