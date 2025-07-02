import { TinaEditProvider } from 'tinacms/dist/edit-state'
import { ReactNode } from 'react'

interface TinaProviderProps {
  children: ReactNode
}

export default function TinaProvider({ children }: TinaProviderProps) {
  return (
    <TinaEditProvider
      editMode={
        <div style={{ position: 'relative' }}>
          {children}
          <div
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: 1000,
              background: '#2563eb',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            ✏️ Edit Mode Active
          </div>
        </div>
      }
    >
      {children}
    </TinaEditProvider>
  )
}