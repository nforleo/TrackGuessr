import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Routes } from './components/Routes.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
        <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  </StrictMode>,
)
