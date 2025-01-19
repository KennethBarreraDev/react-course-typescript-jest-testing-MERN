import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
MainApp
import { BrowserRouter } from "react-router";
import { MainApp } from './11-useContext/MainApp'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { CounterComponent } from './07-useMemo/memorize-test/CounterComponent';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CounterComponent />
    </BrowserRouter>
  </StrictMode>,
)
