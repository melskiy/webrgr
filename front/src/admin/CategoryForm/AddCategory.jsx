import React, { useState, useRef } from 'react';
import './AddCategory.css'; // Импортируем стили

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const fileInputRef = useRef(null);
  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (event) => {
    setCategoryImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Здесь будет логика отправки данных на сервер
    console.log('Название категории:', categoryName);
    console.log('Изображение:', categoryImage);
  };

  return (
    <div className="add-category">
      <h2>ДОБАВИТЬ/ИЗМЕНИТЬ КАТЕГОРИЮ</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="category-name">Название категории:</label>
        <input
          type="text"
          id="category-name"
          name="category-name"
          value={categoryName}
          onChange={handleInputChange}
        />

        <label htmlFor="category-image">Изображение:</label>
        <div className="image-upload" onClick={handleClick}>
          <input className='image_download'
            ref={fileInputRef}
            type="file"
            id="category-image"
            name="category-image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <button type="submit" className='add_image_button'>Добавить</button>
      </form>
    </div>
  );
}

export default AddCategory;