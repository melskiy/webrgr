import { useEffect, useState } from "react";
import "./CategoryCard.css"

const CategoryCard = () => {
    useEffect(() => {
        const url = localStorage.getItem("product");
        fetch("http://localhost:4000/collection/" + url)
            .then(response => response.json())
            .then(response => setProducts(response))
    }, [])
    const [products, setProducts] = useState();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascenging' });

    const sortData = (key) => {
        let direction = 'ascenging';
        if (sortConfig.key === key & sortConfig.direction === 'ascenging') {
            direction = 'descenging'
        }

        const sorted = [...products].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascenging' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascenging' ? 1 : -1;
            }
            return 0;
        });

        setProducts(sorted);
        setSortConfig({ key, direction });
    }

    return (
        <div className="category-card">
            <h1 className="category-card__title">{localStorage.getItem("product_name")}</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Продукт
                        </th>
                        <th>
                            <div className="category-card__th-block">
                                <p>Калории</p>
                                <button onClick={() => sortData('calories')}></button>
                            </div>
                        </th>
                        <th>
                            <div className="category-card__th-block">
                                <p>Белки</p>
                                <button onClick={() => sortData('squirrels')}></button>
                            </div>
                        </th>
                        <th>
                            <div className="category-card__th-block">
                                <p>Жиры</p>
                                <button onClick={() => sortData('fats')}></button>
                            </div>
                        </th>
                        <th>
                            <div className="category-card__th-block">
                                <p>Углеводы</p>
                                <button onClick={() => sortData('carbohydrates')}></button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
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
    )
}

export default CategoryCard;
