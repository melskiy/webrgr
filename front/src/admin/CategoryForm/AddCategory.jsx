import React, { useState, useRef } from 'react';
import './AddCategory.css'; // Импортируем стили

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setCategoryImage(file);
    setImageName(file.name);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', categoryImage);
    formData.append('name', categoryName);
    formData.append('url', imageName);
    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });
        
      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setCategoryName(''); 
    setCategoryImage(null);
    setImageName(''); 
  };

  return (
    <div className="add-category">
      <h2>ДОБАВИТЬ КАТЕГОРИЮ</h2>
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
