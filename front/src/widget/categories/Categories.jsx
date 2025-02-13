// Импортируем хуки useEffect и useState из React
import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import {AD_CATEGORY_PATH} from "../../const/path/PagePaths";
// Импортируем стили Categories.css
import "./Categories.css";

// Импортируем компонент FoodCard из shared/card/FoodCard
import FoodCard from "/src/shared/card/FoodCard";

// Определяем компонент Categories
const Categories = ({ url }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(AD_CATEGORY_PATH); // Переход на страницу добавления
  };
  // Создаем состояние cards с помощью хука useState
  const [cards, setCards] = useState();

  // Используем хук useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    // Fetch API для загрузки данных из файла cards.json
    fetch('src/entities/cards/cards.json')
     .then((response) => response.json())
     .then((response) => setCards(response));
  }, []);

  // Возвращаем разметку компонента
  return (
    <div className="categories">
      {/* Добавляем картинку в компонент */}
      <img
        className="categories__image"
        src="/src/widget/categories/images/main.jpg"
        // Обработчик ошибки для картинки, если она не загрузилась
        onError={(ev) => ev.target.src = '/fallback.png'}
        alt="Различные продукты"
      />
      {/* Добавляем заголовок в компонент */}
      <div className="category_header">
      <p className="categories__title">
        Категории
      </p>
      {localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).isAdmin && (
               <button className="add_category_button" onClick={handleAddClick}></button>
             )
            }
      </div>
      {/* Добавляем блоки с карточками в компонент */}
      <div className="categories__blocks">
        {/* Если cards не пустой, то отображаем карточки */}
        {cards?.map((card) => (
          // Создаем компонент FoodCard для каждой карточки
          <FoodCard
            className="categories__block"
            key={card.name}
            name={card.name}
            img={card.img}
            url={card.url}
          ></FoodCard>
        ))}
      </div>
    </div>
  );
}

// Экспортируем компонент Categories по умолчанию
export default Categories;
