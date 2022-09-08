import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ContactsProvider from './contexts/ContactsProvider'
import ConversationsProvider from './contexts/ConversationProvider'
import SocketProvider from './contexts/SocketProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import useLocalStorage from './hooks/useLocalStorage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
