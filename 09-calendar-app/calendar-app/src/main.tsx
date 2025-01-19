import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CalendarApp } from './CalendarApp';
import { BrowserRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/styles.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CalendarApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
