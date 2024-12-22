// Импортируем необходимые компоненты из react-router-dom
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Импортируем компонент Categories из widget/categories/Categories
import Categories from "/src/widget/categories/Categories";

// Импортируем компонент CategoryCard из widget/category/CategoryCard
import CategoryCard from "/src/widget/category/CategoryCard";

// Импортируем константы путей из файла PagePaths
import { CATEGORIES_PATH, CATEGORY_PATH } from "/src/const/path/PagePaths";
import { useEffect, useState } from "react";
import { AUTH_PATH } from "../../const/path/PagePaths";
import {AD_PRODUCT_PATH} from "../../const/path/PagePaths";
import {AD_CATEGORY_PATH} from "../../const/path/PagePaths";
import {CHANGE_PRODUCT_PATH} from "../../const/path/PagePaths";
import {CHANGE_CATEGORY_PATH} from "../../const/path/PagePaths";
import Login from "../../auth/auth";
import ProductForm from "../../admin/ProductForm/ProductForm";
import AddCategory from "../../admin/CategoryForm/AddCategory";
import ChangeProductForm from "../../admin/ProductForm/ChangeProductForm";
import ChangeCategory from "../../admin/CategoryForm/ChangeCategory";

import Header from "../../shared/layout/Header";
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
    <Header/>
      {/* Определяем Routes, который содержит все маршруты приложения */}
      <Routes>
        {/* Маршрут для категорий */}
        <Route path={AUTH_PATH} element={<Login/>}/>
        <Route path={CATEGORIES_PATH} element={<Categories/>}/>
        <Route path = {AD_CATEGORY_PATH} element = {<AddCategory/>}/>
        <Route path = {AD_PRODUCT_PATH} element = {<ProductForm/>}/>
        <Route path = {CHANGE_CATEGORY_PATH} element = {<ChangeCategory/>}/>
        <Route path = {CHANGE_PRODUCT_PATH} element = {<ChangeProductForm/>}/>

        {cards?.map((card) => (
          <Route key={card.url} path={AD_PRODUCT_PATH + card.url} element={<ProductForm/>} />
        ))}

        {cards?.map((card) => (
          <Route key={card.url} path={AD_CATEGORY_PATH + card.url} element={<AddCategory/>} />
        ))}

        {cards?.map((card) => (
          <Route key={card.url} path={CHANGE_PRODUCT_PATH + card.url} element={<ChangeProductForm/>} />
        ))}

        {cards?.map((card) => (
          <Route key={card.url} path={CHANGE_CATEGORY_PATH+ card.url} element={<ChangeCategory/>} />
        ))}

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
