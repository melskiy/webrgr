import "./FoodCard.css"

const FoodCard = ({ img, name }) => {
    return (
        <div className="food-card">
            <img className="food-card__img" />
            <div className="food-card__block">
                <p className="food-card__block-name">
                    { name }
                </p>
            </div>
        </div>
    );
}

export default FoodCard
