import React, { useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
        setCategoryName(localStorage.getItem("product_name") || '');
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', categoryImage);
    formData.append('name', localStorage.getItem("product_name"));
    formData.append('newUrl', localStorage.getItem("product"));
    formData.append('imagename', imageName);
    try {
      const response = await fetch(`http://localhost:4000/cards/${localStorage.getItem("product")}`, {
        method: 'PUT',
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
      <h2>ИЗМЕНИТЬ КАТЕГОРИЮ</h2>
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

        <button type="submit" className='add_image_button'>Изменить</button>
      </form>
    </div>
  );
}

export default AddCategory;