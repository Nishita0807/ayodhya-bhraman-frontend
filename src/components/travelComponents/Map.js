import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import "../../styles/map.css"; // Import your custom CSS for map styling
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import ReactDOMServer from 'react-dom/server'; // Add this import

const Map = ({ containerId, jsonData }) => {
    const [currentLat, setCurrentLat] = useState(null);
    const [currentLng, setCurrentLng] = useState(null);

    useEffect(() => {

        
        // Check if containerId is provided

        if (!containerId) {
            console.error('Container ID not provided');
            return;
        }

        // Check if map container already exists
        const existingMapContainer = document.getElementById(containerId);
        if (!existingMapContainer) {
            console.error(`Element with ID ${containerId} not found`);
            return;
        }

        // Create a new map container
        const newMapContainer = document.createElement('div');
        newMapContainer.id = 'map'; // Use a unique ID for the map container
        newMapContainer.className = 'map-container';

        // Append the new map container to the provided element
        existingMapContainer.appendChild(newMapContainer);

        // Initialize Leaflet map
        const map = L.map(newMapContainer).setView([26.8, 82.2], 13); // Set initial view to center of provided locations

        // Add OpenStreetMap tiles to the map
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        if (jsonData.length === 1) {
            const location = jsonData[0];
            const roomIcon = L.icon({
                iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M12 2C8.688 2 6 4.688 6 8c0 4.688 6 14 6 14s6-9.312 6-14c0-3.312-2.688-6-6-6zm0 8.25c-1.375 0-2.5-1.125-2.5-2.5s1.125-2.5 2.5-2.5 2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5z"/></svg>'),
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });
            const popupContent = `<span style="font-weight: bold;">${location.name}</span><br>`  +
                            `<div><a href="https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${location.latitude},${location.longitude}" target="_blank">${ReactDOMServer.renderToString(<DirectionsOutlinedIcon />)}</a></div>`;

            const marker = L.marker([location.latitude, location.longitude], { icon: roomIcon }).addTo(map)
                    .bindPopup(popupContent).openPopup();
                    console.log(marker);
        } else {
            // Create a Leaflet icon using an image of the RoomIcon
            const roomIcon = L.icon({
                iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M12 2C8.688 2 6 4.688 6 8c0 4.688 6 14 6 14s6-9.312 6-14c0-3.312-2.688-6-6-6zm0 8.25c-1.375 0-2.5-1.125-2.5-2.5s1.125-2.5 2.5-2.5 2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5z"/></svg>'),
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30],
            });

            // Loop through the data and add markers to the map
            jsonData.forEach(location => {
                const marker = L.marker([location.latitude, location.longitude], { icon: roomIcon }).addTo(map)
                    .bindPopup(location.name);

                // Calculate distances and time for each marker
                const distances = jsonData.map(dest => ({
                    name: dest.name,
                    distance: getDistance(location.latitude, location.longitude, dest.latitude, dest.longitude),
                    time: getEstimatedTime(location.latitude, location.longitude, dest.latitude, dest.longitude)
                }));

                // Add click event listener to the marker
               
                    // Fetch current location using Geolocation API
                    navigator.geolocation.getCurrentPosition(position => {
                        const { latitude: currentLat, longitude: currentLng } = position.coords;

                        // Filter out the current marker from distances
                        const otherDistances = distances.filter(dest => dest.name !== location.name);

                        // Display distances and time in meters and minutes for other two routes
                        const content = otherDistances.map(dest => `<span>${dest.name}:</span> ${dest.distance.toFixed(2)} meters (${dest.time.toFixed(2)} minutes)`).join('<br>');

                        // Add the location name only for the current marker
                        const popupContent = `<span style="font-weight: bold;">${location.name}</span><br>` + (otherDistances.length > 0 ? content : '') +
                            `<div><a href="https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${location.latitude},${location.longitude}" target="_blank">${ReactDOMServer.renderToString(<DirectionsOutlinedIcon />)}</a></div>`;

                        // Bind popup content to marker
                        marker.bindPopup(popupContent);
                        // Open the popup for all markers
map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
        layer.openPopup();
}
});
                        
                    }, error => {
                        console.error('Error getting current location:', error);
                    });
                });
           

            // Draw lines between markers and add event listeners to enable navigation
            const polylines = [];
            jsonData.forEach((location, index) => {
                if (index < jsonData.length - 1) {
                    const currentLocation = jsonData[index];
                    const nextLocation = jsonData[index + 1];
                    const latlngs = [
                        [currentLocation.latitude, currentLocation.longitude],
                        [nextLocation.latitude, nextLocation.longitude]
                    ];
                    const polyline = L.polyline(latlngs, { color: '#114a47', dashArray: '5, 12', weight: 5 }).addTo(map);

                    // Add event listeners for polyline hover
                    polyline.on('click', (e) => { // Adjusted to pass 'e' as the event parameter
                        const startLatLng = polyline.getLatLngs()[0];
                        const endLatLng = polyline.getLatLngs()[1];
                        const bounds = L.latLngBounds([startLatLng, endLatLng]);
                        if (bounds.contains(map.mouseEventToLatLng(e.originalEvent))) { // Accessing the event object properly
                            const startLat = startLatLng.lat;
                            const startLng = startLatLng.lng;
                            const endLat = endLatLng.lat;
                            const endLng = endLatLng.lng;

                            // Open Google Maps direction page in a new tab
                            window.open(`https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}`, '_blank');
                        }
                    });

                    polylines.push(polyline);
                }
            });

            // Zoom the map to fit all markers and lines
            const bounds = L.latLngBounds(jsonData.map(location => [location.latitude, location.longitude]));
            map.fitBounds(bounds);
        }

        // Cleanup function to remove the map container when component unmounts
        return () => {
            newMapContainer.remove();
        };
    }, [containerId, jsonData,currentLat,currentLng]); // Dependencies added to re-render the map if containerId or jsonData changes

    // Fetch current location when jsonData length is 1
    useEffect(() => {
        if (jsonData.length === 1) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLat(latitude);
                    setCurrentLng(longitude);
                },
                error => {
                    console.error('Error getting current location:', error);
                }
            );
        }
    }, [jsonData.length]);

    return null; // Map is rendered in the useEffect hook
};

// Function to calculate distance between two points using Haversine formula
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d * 1000; // Convert to meters
}

// Function to convert degrees to radians
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

// Function to estimate time based on distance and average walking speed
function getEstimatedTime(lat1, lon1, lat2, lon2) {
    const distance = getDistance(lat1, lon1, lat2, lon2); // Distance in meters
    const walkingSpeed = 1.4; // Average walking speed in meters per second
    return distance / walkingSpeed / 60; // Convert seconds to minutes
}

export default Map;
