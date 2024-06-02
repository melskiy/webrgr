// Импортируем хуки useEffect и useState из React
import { useEffect, useState } from "react";

// Импортируем стили CategoryCard.css
import "./CategoryCard.css";

// Определяем компонент CategoryCard
const CategoryCard = () => {
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
      <h1 className="category-card__title">{localStorage.getItem("product_name")}</h1>
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
                <button onClick={() => sortData('calories')}></button>
              </div>
            </th>
            <th>
              {/* Добавляем блок для сортировки по белкам */}
              <div className="category-card__th-block">
                <p>Белки</p>
                <button onClick={() => sortData('squirrels')}></button>
              </div>
            </th>
            <th>
              {/* Добавляем блок для сортировки по жирам */}
              <div className="category-card__th-block">
                <p>Жиры</p>
                <button onClick={() => sortData('fats')}></button>
              </div>
            </th>
            <th>
              {/* Добавляем блок для сортировки по углеводам */}
              <div className="category-card__th-block">
                <p>Углеводы</p>
                <button onClick={() => sortData('carbohydrates')}></button>
              </div>
            </th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Экспортируем компонент CategoryCard по умолчанию
export default CategoryCard;
