import { useEffect } from "react";
import "./CategoryCard.css"

const CategoryCard = () => {
    // useEffect(() => (
    //     fetch("")
    // ))
    return (
        <div className="category-card">
            <h1 className="category-card__title">НАЗВАНИЕ КАТЕГОРИИ</h1>
            <table>
                <thead>
                    <tr>
                        <th>Продукт</th>
                        <th>Калории</th>
                        <th>Белки</th>
                        <th>Жиры</th>
                        <th>Углеводы</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Пример продукта 1</td>
                        <td>100</td>
                        <td>5</td>
                        <td>3</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Пример продукта 2</td>
                        <td>150</td>
                        <td>7</td>
                        <td>5</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CategoryCard;
