import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Routes } from './components/Routes.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <div className="App main">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
)
