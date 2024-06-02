import { useEffect, useState } from "react";
import "./Categories.css"
import FoodCard from "/src/shared/card/FoodCard";

const Categories = () => {
    const [cards, setCards] = useState();
    useEffect(() => {
        fetch('src/entities/cards/cards.json')
            .then((response) => response.json())
            .then((response) => setCards(response));
    });
    return (
        <div className="categories">
            <img

                className="categories__image"
                src="/src/widget/categories/images/main.jpg"
                alt=""
            />
            <p className="categories__title">
                Категории
            </p>
            <div className="categories__blocks">
                {cards?.map((card) => (
                    <FoodCard className="categories__block" key={card.name} name={card.name} img={card.img} url={card.url}></FoodCard>
                ))}
            </div>
        </div>
    )
}

export default Categories;
