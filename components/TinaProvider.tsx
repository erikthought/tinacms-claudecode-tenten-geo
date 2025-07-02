import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface TinaProviderProps {
  children: ReactNode
}

declare global {
  interface Window {
    TinaCMS?: any
  }
}

export default function TinaProvider({ children }: TinaProviderProps) {
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    // Check for edit mode in URL
    const editParam = router.query.edit === 'true' || 
                     (typeof window !== 'undefined' && window.location.search.includes('edit=true'))
    setIsEditMode(editParam)
  }, [router.query])

  const toggleEditMode = () => {
    const url = new URL(window.location.href)
    if (isEditMode) {
      url.searchParams.delete('edit')
    } else {
      url.searchParams.set('edit', 'true')
    }
    window.location.href = url.toString()
  }

  const EditModeToolbar = () => (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 10000,
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          background: '#059669',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        ✏️ Visual Editing Active - Click any text to edit!
        <button
          onClick={toggleEditMode}
          style={{
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            color: '#059669',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Exit Edit Mode
        </button>
      </div>
      <a
        href="/admin/index.html"
        target="_blank"
        style={{
          background: '#2563eb',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        🏛️ Admin Panel
      </a>
    </div>
  )

  const EditModeToggle = () => (
    <button
      onClick={toggleEditMode}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 10000,
        background: '#2563eb',
        color: 'white',
        border: 'none',
        padding: '16px 24px',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.3s ease',
        border: '2px solid rgba(255,255,255,0.1)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(37, 99, 235, 0.4)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)'
      }}
    >
      ✏️ Edit This Page
    </button>
  )

  // Add CSS for TinaCMS field highlighting
  useEffect(() => {
    if (isEditMode && typeof window !== 'undefined') {
      const style = document.createElement('style')
      style.textContent = `
        [data-tina-field] {
          position: relative;
          cursor: pointer !important;
          border: 2px dashed transparent;
          border-radius: 4px;
          padding: 4px;
          transition: all 0.2s ease;
        }
        [data-tina-field]:hover {
          border-color: #2563eb !important;
          background-color: rgba(37, 99, 235, 0.05) !important;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1) !important;
        }
        [data-tina-field]:hover::after {
          content: "Click to edit";
          position: absolute;
          top: -30px;
          left: 0;
          background: #2563eb;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          z-index: 1000;
        }
      `
      document.head.appendChild(style)
      
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [isEditMode])

  return (
    <div>
      {children}
      {isEditMode && <EditModeToolbar />}
      {!isEditMode && <EditModeToggle />}
    </div>
  )
}