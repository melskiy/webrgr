// Импортируем Link из react-router-dom для создания ссылки
import { Link } from "react-router-dom";

// Импортируем стили для компонента FoodCard
import "./FoodCard.css";

// Импортируем константы путей из файла PagePaths
import { CATEGORY_PATH } from "/src/const/path/PagePaths";

// Определяем компонент FoodCard, который принимает три пропса: img, name и url
const FoodCard = ({ img, name, url }) => {
  return (
    // Создаем ссылку с помощью Link из react-router-dom
    <Link
      // Добавляем обработчик клика, который сохраняет url и name в localStorage
      onClick={() => {
        localStorage.setItem("product", url);
        localStorage.setItem("product_name", name);
      }}
      // Добавляем класс для стилизации ссылки
      className="food-card-link"
      // Указываем путь, на который будет вести ссылка
      to={CATEGORY_PATH + url}
    >
      {/* Создаем контейнер для карточки продукта */}
      <div className="food-card">
        {/* Добавляем класс для стилизации изображения */}
        <img
          className="food-card__img"
          // Указываем src для изображения
          src={img}
          // Добавляем обработчик ошибки, который изменяет src на fallback.png, если изображение не загрузится
          onError={(ev) => ev.target.src = '/fallback.png'}
          // Указываем alt для изображения
          alt={name}
        />
        {/* Создаем блок с информацией о продукте */}
        <div className="food-card__block">
          {/* Создаем параграф с именем продукта */}
          <p className="food-card__block-name">
            { name }
          </p>
        </div>
      </div>
    </Link>
  );
};

// Экспортируем компонент FoodCard
export default FoodCard;