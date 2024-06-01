import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Router from '/src/app/router/Router.jsx'
import Layout from './shared/layout/Layout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <Router/>
    </Layout>
  </React.StrictMode>,
)
