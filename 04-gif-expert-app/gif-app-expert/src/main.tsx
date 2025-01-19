import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GifExpertApp } from './GifExpertApp'
import './styles/main-styles/styles.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GifExpertApp />
  </StrictMode>,
)
