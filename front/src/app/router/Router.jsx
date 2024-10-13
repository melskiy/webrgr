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
import { useEffect, useState } from "react";
import { AUTH_PATH } from "../../const/path/PagePaths";
import Login from "../../auth/auth";

// Определяем компонент Router
const Router = () => {
  // Создаем состояние cards с помощью хука useState
  const [cards, setCards] = useState();

  // Используем хук useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    // Fetch API для загрузки данных из файла cards.json
    fetch('src/entities/cards/cards.json')
     .then((response) => response.json())
     .then((response) => setCards(response));
  }, []);
  // Возвращаем BrowserRouter, который является корневым компонентом для маршрутизации
  return (
    <BrowserRouter>
      {/* Определяем Routes, который содержит все маршруты приложения */}
      <Routes>
        {/* Маршрут для категорий */}
        <Route path={AUTH_PATH} element={<Login/>}/>
        <Route path={CATEGORIES_PATH} element={<Categories/>}/>
        {/* Маршруты для карточки категории */}
        {cards?.map((card) => (
          <Route key={card.url} path={CATEGORY_PATH + card.url} element={<CategoryCard />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

// Экспортируем компонент Router по умолчанию
export default Router;