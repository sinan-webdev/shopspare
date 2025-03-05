import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { ProviderComp } from './context/CreateContext.jsx'

createRoot(document.getElementById('root')).render(
  <ProviderComp>
  <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>,
  </BrowserRouter>
  </ProviderComp>
)
