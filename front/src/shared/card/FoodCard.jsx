import { Link } from "react-router-dom";
import "./FoodCard.css";
import { CATEGORY_PATH, CATEGORIES_PATH } from "/src/const/path/PagePaths";

const FoodCard = ({ img, name, url }) => {
    return (
        <Link
            onClick={() => { localStorage.setItem("product", url); localStorage.setItem("product_name", name) }}
            className="food-card-link"
            to={CATEGORY_PATH}
            target="_blank"
        >
            <div className="food-card">
                <img className="food-card__img"
                    src={img}
                    onError={(ev) => ev.target.src = '/fallback.png'}
                    alt={name}
                />
                <div className="food-card__block">
                    <p className="food-card__block-name">
                        { name }
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default FoodCard
