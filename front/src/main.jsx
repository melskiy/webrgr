import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './shared/layout/Layout.jsx'
import Categories from './widget/categories/Categories.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Layout>
      <Categories/>
    </Layout>
  </React.StrictMode>,
)
