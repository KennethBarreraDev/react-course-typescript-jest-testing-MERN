import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.css'
import { MyApp } from './MyApp'
import { AppTheme } from './theme/theme'
import { store } from './store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppTheme>
        <MyApp />
      </AppTheme>
    </Provider>,

  </StrictMode>,
)
