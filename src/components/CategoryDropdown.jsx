import React from 'react';

const CategoryDropdown = ({ categories, selectedCategory, onSelectCategory }) => {
  
  return (
    <div className='container m-auto px-2 mb-4'>
      <label className='text-l' htmlFor="category">Filtrera efter kategori: </label>
      <select className='text-orange-100 uppercase bg-orange-700 rounded-lg px-1 py-1 text-sm' id='category' value={selectedCategory} onChange={(e) => onSelectCategory(e.target.value)}>
        <option value="">Alla kategorier</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryDropdown;