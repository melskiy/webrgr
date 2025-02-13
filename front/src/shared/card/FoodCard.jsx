// Импортируем Link из react-router-dom для создания ссылки
import { Link, useNavigate} from "react-router-dom";

// Импортируем стили для компонента FoodCard
import "./FoodCard.css";
import {CHANGE_CATEGORY_PATH} from "../../const/path/PagePaths";
// Импортируем константы путей из файла PagePaths
import { CATEGORY_PATH } from "/src/const/path/PagePaths";

// Определяем компонент FoodCard, который принимает три пропса: img, name и url
const FoodCard = ({ img, name, url }) => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate(CHANGE_CATEGORY_PATH + url); // Переход на страницу добавления
  };

  const handleDeleteClick = async () => {
    await fetch(`http://localhost:4000/cards/${url}`, {
      method: 'DELETE',
    });
    window.location.reload();
  };

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
            {localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).isAdmin && (
              <div className="admin_buttons">
                <div>
               <button className="delete_category_button" onClick={ 
                      (e) => {
                        e.preventDefault();
                        handleDeleteClick();
                      }
                    }></button>
               <button className="edit_category_button"onClick={ 
                      (e) => {
                        e.preventDefault();
                        handleAddClick();
                      }
              }
                ></button>
               </div>
            </div>
             )
            }
          </p>
        </div>
      </div>
    </Link>
  );
};

// Экспортируем компонент FoodCard
export default FoodCard;