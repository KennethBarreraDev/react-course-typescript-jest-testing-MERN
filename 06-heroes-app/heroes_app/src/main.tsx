import { StrictMode } from 'react'
import './styles.css'
import { HeroesApp } from './HeroesApp'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter } from "react-router";
import 'animate.css';
import { AuthProvider } from './globals/context/AuthContext';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HeroesApp />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
