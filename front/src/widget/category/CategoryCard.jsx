// Импортируем хуки useEffect и useState из React
import { useEffect, useState } from "react";
import {CHANGE_PRODUCT_PATH} from "../../const/path/PagePaths";
import {AD_PRODUCT_PATH} from "../../const/path/PagePaths";
import { useNavigate } from 'react-router-dom';
// Импортируем стили CategoryCard.css
import "./CategoryCard.css";

// Определяем компонент CategoryCard
const CategoryCard = () => {
  const navigate = useNavigate();
  const handleAddClick = () => {
    navigate(CHANGE_PRODUCT_PATH + localStorage.getItem("product")); // Переход на страницу добавления
  };

  const handleAddClickAdd = () => {
    navigate(AD_PRODUCT_PATH + localStorage.getItem("product")); // Переход на страницу добавления
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/collection/${localStorage.getItem("product")}/${id}`, 
      { method: 'DELETE', headers: { 'Content-Type': 'application/json' }});
  };
  // Используем хук useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    // Получаем URL из localStorage
    const url = localStorage.getItem("product");
    // Fetch API для загрузки данных из сервера
    fetch("http://localhost:4000/collection/" + url)
      .then(response => response.json())
      .then(response => setProducts(response));
  }, []);

  // Создаем состояние products с помощью хука useState
  const [products, setProducts] = useState();

  // Создаем состояние sortConfig с помощью хука useState
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascenging' });

  // Функция для сортировки данных
  const sortData = (key) => {
    let direction = 'ascenging';
    if (sortConfig.key === key && sortConfig.direction === 'ascenging') {
      direction = 'descenging';
    }

    // Создаем копию массива products
    const sorted = [...products].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascenging' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascenging' ? 1 : -1;
      }
      return 0;
    });

    // Обновляем состояние products и sortConfig
    setProducts(sorted);
    setSortConfig({ key, direction });
  }

  // Возвращаем разметку компонента
  return (
    <div className="category-card">
      {/* Добавляем заголовок в компонент */}
      <div className="category_card_header">
      <h1 className="category-card__title">{localStorage.getItem("product_name")}</h1>
      {localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).isAdmin && (
               <button className="add_category_button" onClick={handleAddClickAdd}></button>
             )
            }
            </div>
      {/* Добавляем таблицу в компонент */}
      <table>
        <thead>
          <tr>
            <th>
              Продукт
            </th>
            <th>
              {/* Добавляем блок для сортировки по калориям */}
              <div className="category-card__th-block">
                <p>Калории</p>
                <button className="card_button" onClick={() => sortData('calories')}></button>
              </div>
            </th>
            <th>
              {/* Добавляем блок для сортировки по белкам */}
              <div className="category-card__th-block">
                <p>Белки</p>
                <button className="card_button" onClick={() => sortData('squirrels')}></button>
              </div>
            </th>
            <th>
              {/* Добавляем блок для сортировки по жирам */}
              <div className="category-card__th-block">
                <p>Жиры</p>
                <button className="card_button" onClick={() => sortData('fats')}></button>
              </div>
            </th>
            <th>
              {/* Добавляем блок для сортировки по углеводам */}
              <div className="category-card__th-block">
                <p>Углеводы</p>
                <button className="card_button" onClick={() => sortData('carbohydrates')}></button>
              </div>
            </th>
          
          {localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).isAdmin && (
               <th>Действие
               </th>
             )
            }
        </tr>
        </thead>
        <tbody>
          {/* Если products не пустой, то отображаем строки таблицы */}
          {products?.map((product) => (
            <tr key={product.id}>
              <td>{product.product}</td>
              <td>{product.calories}</td>
              <td>{product.squirrels}</td>
              <td>{product.fats}</td>
              <td>{product.carbohydrates}</td>
    
              {localStorage.getItem('user') &&
          JSON.parse(localStorage.getItem('user')).isAdmin && (
            <td>
              <div className="admin_buttons">
                <div>
               <button className="delete_category_button"
               onClick={ 
                (e) => {
                  e.preventDefault();
                  handleDelete(product._id);
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
            </td>
             )
            }
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Экспортируем компонент CategoryCard по умолчанию
export default CategoryCard;
