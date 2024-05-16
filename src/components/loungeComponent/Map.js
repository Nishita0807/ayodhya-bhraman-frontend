import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import DirectionsOutlinedIcon from '@mui/icons-material/DirectionsOutlined';
import ReactDOMServer from 'react-dom/server';

const Map = ({ containerId, filteredHotels }) => {
    // Add a function to get the user's current location
    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve(position.coords);
                    },
                    error => {
                        reject(error.message);
                    }
                );
            } else {
                reject("Geolocation is not supported by your browser");
            }
        });
    }

    // Modify the useEffect hook to fetch the current location and update the link
    useEffect(() => {
        if (typeof L === 'undefined' || !containerId) {
            console.error('Leaflet or container ID not provided');
            return;
        }

        const mapContainer = document.getElementById(containerId);
        if (!mapContainer) {
            console.error(`Element with ID ${containerId} not found`);
            return;
        }

        const map = L.map(mapContainer).setView([26.8, 82.2], 5);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const bounds = [];
        const markers = [];

        filteredHotels.forEach(hotel => {
            if (hotel.mapLocation) {
                const [latStr, lonStr] = hotel.mapLocation.split(',');
                const latitude = parseFloat(latStr);
                const longitude = parseFloat(lonStr);

                if (!isNaN(latitude) && !isNaN(longitude)) {
                    const roomIcon = L.icon({
                        iconUrl: 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#FF0000" d="M12 2C8.688 2 6 4.688 6 8c0 4.688 6 14 6 14s6-9.312 6-14c0-3.312-2.688-6-6-6zm0 8.25c-1.375 0-2.5-1.125-2.5-2.5s1.125-2.5 2.5-2.5 2.5 1.125 2.5 2.5-1.125 2.5-2.5 2.5z"/></svg>'),
                        iconSize: [30, 30],
                        iconAnchor: [15, 30],
                        popupAnchor: [0, -30],
                    });
                    const popupContent = `<span style="font-weight: bold;">${hotel.name}</span><br>` +
                        `<div style="display:flex;align-items:center;justify-content:center"><a href="#" onclick="navigateToDirections(${latitude}, ${longitude})">${ReactDOMServer.renderToString(<DirectionsOutlinedIcon />)}</a></div>`;
                    const marker = L.marker([latitude, longitude], { icon: roomIcon }).addTo(map);
                    marker.bindPopup(popupContent).openPopup();
                    markers.push([latitude, longitude]);
                } else {
                    console.error(`Invalid latitude or longitude for hotel: ${hotel.name}`);
                }
            } else {
                console.error(`mapLocation not found for hotel: ${hotel.name}`);
            }
        });

        // Function to navigate to directions using current location
        window.navigateToDirections = async (destLat, destLng) => {
            try {
                const coords = await getCurrentLocation();
                const { latitude, longitude } = coords;
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destLat},${destLng}`, '_blank');
            } catch (error) {
                console.error('Error getting current location:', error);
            }
        };

        if (markers.length > 0) {
            // Define starting point (first marker) and destination point (last marker)
            const startingPoint = markers[0];
            const destinationPoint = markers[markers.length - 1];
            console.log(destinationPoint);
            // Create polyline connecting all markers
            const polyline = L.polyline(markers, { color: '#114a47', dashArray: '5, 12', weight: 5 }).addTo(map);

            // Attach click event listener to the polyline
            polyline.on('mouseover', (e) => {
                // Get the clicked coordinates
                const { lat, lng } = e.latlng;

                // Find the nearest marker to the clicked coordinates
                const nearestMarker = findNearestMarker(markers, lat, lng);

                // If a marker is found, navigate to Google Maps with directions from the starting point to the marker
                if (nearestMarker) {
                    const [startLat, startLng] = startingPoint;
                    const [destLat, destLng] = nearestMarker;
                    window.open(`https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${destLat},${destLng}`, '_blank');
                }
            });
        }

        if (bounds.length > 0) {
            map.fitBounds(bounds);
        }

        return () => {
            map.remove();
        };
    }, [containerId, filteredHotels]);

    return <div id={containerId} className="leaflet-map-container" />;
};

export default Map;

function findNearestMarker(markers, lat, lng) {
    let minDistance = Infinity;
    let nearestMarker = null;

    markers.forEach(marker => {
        const [markerLat, markerLng] = marker;
        const distance = Math.sqrt(Math.pow(lat - markerLat, 2) + Math.pow(lng - markerLng, 2));

        if (distance < minDistance) {
            minDistance = distance;
            nearestMarker = marker;
        }
    });

    return nearestMarker;
}
