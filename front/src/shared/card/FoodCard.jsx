import { Link } from "react-router-dom";
import "./FoodCard.css";
import { CATEGORY_PATH, CATEGORIES_PATH } from "/src/const/path/PagePaths";

const FoodCard = ({ img, name }) => {
    return (
        <Link className="food-card-link" to={CATEGORY_PATH} target="_blank">
            <div className="food-card">
                <img className="food-card__img" src={img} />
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
