import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'
import '@fontsource/marcellus/400.css'
import '@fontsource/nunito-sans/400.css'
import '@fontsource/nunito-sans/600.css'
import '@fontsource/nunito-sans/700.css'
import './styles.css'
import App from './App'
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
