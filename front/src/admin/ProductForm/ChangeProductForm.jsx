
import React, { useState } from 'react';
import "./ProductForm.css";

function ProductForm() {
  const [productName, setProductName] = useState('');
  const [calories, setCalories] = useState('');
  const [proteins, setProteins] = useState('');
  const [fats, setFats] = useState('');
  const [carbohydrates,   
 setCarbohydrates] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDocument = {
      product : productName,
      calories: calories,
      squirrels: proteins,
      fats: fats,
      carbohydrates: carbohydrates
    }
    fetch(`http://localhost:4000/collection/${localStorage.getItem("product")}`, 
      { method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(newDocument) });
    console.log({
      productName,
      calories,
      proteins,
      fats,
      carbohydrates
    });
  };

  return (
    <div className='form-container'>
    <form  className='forms' onSubmit={handleSubmit}>
       <h2> ИЗМЕНИТЬ ПРОДУКТ</h2>
      <div className="form-group">
        <label htmlFor="productName">Название продукта:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="calories">Калории:</label>   

        <input
          type="number"
          id="calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">Белки:</label>
        <input
          type="number"
          id="proteins" 
          value={proteins}
          onChange={(e) => setProteins(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">Жиры:</label>
        <input
          type="number"
          id="fats"
          value={fats}
          onChange={(e) => setFats(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">Углеводы:</label>
        <input
          type="number"
          id="carbohydrates"
          value={carbohydrates}
          onChange={(e) => setCarbohydrates(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className='btn-primary'>Изменить</button>
    </form>
    </div>
  );
}

export default ProductForm;