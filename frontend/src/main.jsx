import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import UseContextProvider from './context/useContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UseContextProvider>
    <BrowserRouter>
     <App />
    </BrowserRouter>
    </UseContextProvider>
  </StrictMode>,
)
