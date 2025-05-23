import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import Header from './components/Header.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Header /> */}
    <App />
  </StrictMode>,
)
