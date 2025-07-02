import { TinaEditProvider } from 'tinacms/dist/edit-state'
import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

interface TinaProviderProps {
  children: ReactNode
}

export default function TinaProvider({ children }: TinaProviderProps) {
  const router = useRouter()
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    // Check for edit mode in URL
    const editParam = router.query.edit === 'true' || 
                     typeof window !== 'undefined' && window.location.search.includes('edit=true')
    setIsEditMode(editParam)
  }, [router.query])

  const toggleEditMode = () => {
    const url = new URL(window.location.href)
    if (isEditMode) {
      url.searchParams.delete('edit')
    } else {
      url.searchParams.set('edit', 'true')
    }
    window.history.pushState({}, '', url.toString())
    setIsEditMode(!isEditMode)
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
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        ✏️ Edit Mode Active
        <button
          onClick={toggleEditMode}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Exit
        </button>
      </div>
      <a
        href="/admin/index.html"
        target="_blank"
        style={{
          background: '#2563eb',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
        bottom: '20px',
        right: '20px',
        zIndex: 10000,
        background: '#2563eb',
        color: 'white',
        border: 'none',
        padding: '12px 16px',
        borderRadius: '50px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      ✏️ Edit Page
    </button>
  )

  return (
    <TinaEditProvider
      editMode={
        <div style={{ position: 'relative' }}>
          {children}
          <EditModeToolbar />
        </div>
      }
    >
      {children}
      {!isEditMode && <EditModeToggle />}
    </TinaEditProvider>
  )
}