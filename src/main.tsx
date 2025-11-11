import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store, persistor } from './store/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import "./i18n"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      
    </Provider>
  </StrictMode>,
)
