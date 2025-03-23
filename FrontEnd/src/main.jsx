import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='dark: bg-slate-900 dark:text-white'>
    <App />
    </div>
  </StrictMode>,
)
