// In LoungeAccess.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoungeList from './loungeComponent/LoungeList';
import Map from './loungeComponent/Map';
import "../styles/travel.css";

function LoungeAccess() {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]); // State to store filtered hotels
axios.defaults.withCredentials=true;
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/hotels`);
                
                // Manually added JSON data
                const manuallyAddedData = [
                    {
                        _id: '1',
                        name: 'Hotel C',
                        image: 'ayodhya1.jpg',
                        contactNo: '9876543210',
                        category: 'Hotel',
                        minPrice: '2000',
                        maxPrice: '3000',
                        mapLocation: '24.6868,56.7979'
                    },
                    {
                        _id: '2',
                        name: 'Hotel BD',
                        image: 'ayodhya2.jpg',
                        contactNo: '9822543210',
                        category: 'Dharamshala',
                        minPrice: '100',
                        maxPrice: '300',
                        mapLocation: '28.40749513728814, 77.32735496710349'
                    },
                    // Add more objects as needed
                ];

                // Merge fetched data with manually added data
                const mergedData = [...response.data, ...manuallyAddedData];
                
                // Set the hotels state after merging data
                setHotels(mergedData);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchHotels();
    }, []); // Empty dependency array to fetch data only once when the component mounts

    const handleFilterChange = (filter) => {
        // Apply filter criteria to the hotels list and set filtered hotels state
        const filtered = hotels.filter(hotel => {
            const categoryMatch = filter.selectedCategory === '' || hotel.category === filter.selectedCategory;
            const minPriceMatch = filter.minPrice === '' || parseInt(hotel.minPrice) >= parseInt(filter.minPrice);
            const maxPriceMatch = filter.maxPrice === '' || parseInt(hotel.maxPrice) <= parseInt(filter.maxPrice);
            return categoryMatch && minPriceMatch && maxPriceMatch;
        });
        setFilteredHotels(filtered);
    };

    return (
        <div className='travel'>
            <div className="row">
                <div className="card-list-wrapper">
                    {/* Pass hotels and onFilterChange function */}
                    <LoungeList hotels={hotels} onFilterChange={handleFilterChange} />
                </div>
                <div id="map-container" className="map-container">
                    {/* Pass filtered hotels to Map component */}
                    <Map containerId="map-container" filteredHotels={filteredHotels.length===0?hotels:filteredHotels} />
                </div>
            </div>
        </div>
    );
}

export default LoungeAccess;
