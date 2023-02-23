import React from 'react'
import ReactDOM from 'react-dom/client'

  //Pages
import App from './App'

import { AuthProvider } from "./context/AuthContext"
import { StateContext } from './context/StateContext'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContext>
      <AuthProvider>
          <App/>
      </AuthProvider>
    </StateContext>
  </React.StrictMode>
);
