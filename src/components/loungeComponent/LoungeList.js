// In LoungeList.js

import React, { useState } from 'react';
import LoungeCard from './LoungeCard';
import "../../styles/travel.css";

function LoungeList({ hotels, onFilterChange }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Filter hotels based on selected category and price range
    const filteredHotels = hotels.filter(hotel => {
        // Filter by category
        const categoryMatch = selectedCategory === '' || hotel.category === selectedCategory;

        // Filter by price range
        const minPriceMatch = minPrice === '' || parseInt(hotel.minPrice) >= parseInt(minPrice);
        const maxPriceMatch = maxPrice === '' || parseInt(hotel.maxPrice) <= parseInt(maxPrice);

        return categoryMatch && minPriceMatch && maxPriceMatch;
    });

    // Handle category selection change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        // Call the onFilterChange function passed from the parent component
        onFilterChange({ selectedCategory: e.target.value, minPrice, maxPrice });
    };

    // Handle min price input change
    const handleMinPriceChange = (e) => {
        setMinPrice(e.target.value);
        // Call the onFilterChange function passed from the parent component
        onFilterChange({ selectedCategory, minPrice: e.target.value, maxPrice });
    };

    // Handle max price input change
    const handleMaxPriceChange = (e) => {
        setMaxPrice(e.target.value);
        // Call the onFilterChange function passed from the parent component
        onFilterChange({ selectedCategory, minPrice, maxPrice: e.target.value });
    };

    return (
        <div>
            <div className='tool-bar' style={{ gap: "4px" }}>
                <div className='category-dropdown'>
                    <select value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {/* Assuming categories are available in the hotels data */}
                        {[...new Set(hotels.map(hotel => hotel.category))].map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className='prices'>
                <div className='bar'> <input type="number" placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} /></div>
                <div className=' bar'><input type="number" placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} /></div>
                </div>
            </div>

            <div>
                {filteredHotels.map(hotel => (
                    <LoungeCard key={hotel._id} hotel={hotel} />
                ))}
            </div>
        </div>
    );
}

export default LoungeList;
