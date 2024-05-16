import React, { useState, useEffect } from 'react';
import Card from './Card';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const CardList = ({ currentLocation, jsonData, filterDataByLocation, clickedImage, category }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  // Function to handle search icon click or Enter key press
  const handleSearch = () => {
    const formattedSearchValue = searchValue.trim().toLowerCase();
    filterDataByLocation(formattedSearchValue, selectedCategory);
  };

  // Function to handle input change
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      filterDataByLocation('', selectedCategory);
    }
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    filterDataByLocation(searchValue, category); // Pass the selected category to the filter function
  };

  // Split category name with uppercase letters
  const splitCategoryName = (name) => {
    return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  };

  // Auto select the filter category option based on the provided category prop
  useEffect(() => {
    if (category && category.trim() !== '') {
      setSelectedCategory(category.trim());
    }
  }, [category]);

  // Filter the jsonData based on the searchValue and selectedCategory
  useEffect(() => {
    let filteredLocations = jsonData;
    if (clickedImage) {
      const matchingImage = filteredLocations.find(image => image.source === clickedImage);
      filteredLocations = matchingImage ? [matchingImage] : [];
      setSelectedCategory(matchingImage.category);
    } else if (searchValue || selectedCategory) {
      const regexPattern = searchValue.toLowerCase().split('').join('.*');
      const regex = new RegExp(regexPattern);
      filteredLocations = filteredLocations.filter(location => {
        const matchesSearch = regex.test(location.name.toLowerCase());
        const matchesCategory = !selectedCategory || location.category === selectedCategory;
          

        return matchesSearch && matchesCategory;
      });
    }
    setFilteredData(filteredLocations);
  }, [jsonData, clickedImage, searchValue, selectedCategory]);

  // Alert if no locations match the criteria
  useEffect(() => {
    if (filteredData.length === 0 && !clickedImage && searchValue !== '') {
      alert("No locations match the specified criteria.");
    }
  }, [filteredData, clickedImage, searchValue]);

  return (
    <div>
      <div className='tool-bar'>
        <div className='search-bar'>
          <input
            type="text"
            placeholder="Travel Location"
            value={searchValue}
            onChange={handleChange}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <div className='search-icon' onClick={handleSearch}><SearchOutlinedIcon /></div>
        </div>
        <div className='category-dropdown'>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Category</option>
            {[...new Set(jsonData.map(location => location.category))].map((category, index) => (
              <option key={index} value={category}>{splitCategoryName(category)}</option>
            ))}
          </select>
        </div>
      </div>
      {filteredData.map(location => (
        <Card key={location.id} location={location} currentLocation={currentLocation} />
      ))}
    </div>
  );
};

export default CardList;
