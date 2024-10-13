// Импортируем библиотеку React
import React from 'react'

// Импортируем библиотеку ReactDOM для работы с DOM
import ReactDOM from 'react-dom/client'

// Импортируем стили для страницы
import './index.css'

// Импортируем компонент Router для навигации по странице
import Router from '/src/app/router/Router.jsx'

// Импортируем компонент Layout для структуры страницы
import Layout from './shared/layout/Layout'


// Создаем корневой элемент (root) в элементе HTML с id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  // Активируем строгий режим React для обнаружения ошибок
  <React.StrictMode>
    {/* Рендерим компонент Layout, который является структурой страницы */}
    <Layout>
      {/* Рендерим компонент Router, который является навигацией по странице */}
      <Router/>
    </Layout>
  </React.StrictMode>
  ,
)