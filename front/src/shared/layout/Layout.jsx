// Импортируем стили Layout.css
import './Layout.css';

// Импортируем PropTypes для валидации пропсов
import PropTypes from 'prop-types';

// Определяем компонент Layout, который будет использоваться как обертка для других компонентов
const Layout = ({ children }) => {
  // Возвращаем разметку компонента
  return (
    <div className="layout">
      {/* Определяем заголовок Layout */}
      <header className="layout__header">
        {/* Добавляем первую картинку в заголовок */}
        <div className="layout__header-first-img"/>
        {/* Добавляем текст в заголовок */}
        <p className="layout__header-text">
          Справочник диетолога
        </p>
        {/* Добавляем вторую картинку в заголовок */}
        <div className="layout__header-second-img"/>
      </header>
      {/* Определяем основную часть Layout */}
      <main className="layout__main">
        {/* Вставляем дочерние компоненты в основную часть Layout */}
        {children}
      </main>
    </div>
  );
}

// Определяем пропсы Layout
Layout.propTypes = {
  children: PropTypes.node // Дочерние компоненты Layout
};

// Экспортируем компонент Layout по умолчанию
export default Layout;
