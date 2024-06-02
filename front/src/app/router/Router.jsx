// Импортируем необходимые компоненты из react-router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Импортируем компонент Layout из shared/layout/Layout
import Layout from "/src/shared/layout/Layout";

// Импортируем компонент Categories из widget/categories/Categories
import Categories from "/src/widget/categories/Categories";

// Импортируем компонент CategoryCard из widget/category/CategoryCard
import CategoryCard from "/src/widget/category/CategoryCard";

// Импортируем константы путей из файла PagePaths
import { CATEGORIES_PATH, CATEGORY_PATH } from "/src/const/path/PagePaths";

// Определяем компонент Router
const Router = () => {
  // Возвращаем BrowserRouter, который является корневым компонентом для маршрутизации
  return (
    <BrowserRouter>
      {/* Определяем Routes, который содержит все маршруты приложения */}
      <Routes>
        {/* Маршрут для категорий */}
        <Route path={CATEGORIES_PATH} element={<Categories/>}/>
        {/* Маршрут для карточки категории */}
        <Route path={CATEGORY_PATH} element={<CategoryCard/>} />
      </Routes>
    </BrowserRouter>
  );
};

// Экспортируем компонент Router по умолчанию
export default Router;