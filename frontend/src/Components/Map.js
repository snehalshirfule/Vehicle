import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import { getVehicleRoute } from '../api/vehicleApi';

const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};

const center = {
  lat: 17.385044,
  lng: 78.486671
};

const Map = () => {
  const [route, setRoute] = useState([]);
  const [source, setSource] = useState('17.385044,78.486671'); // Example: Source coordinates
  const [destination, setDestination] = useState('17.490000,78.400000'); // Example: Destination coordinates
  const [directions, setDirections] = useState(null);
  
  const directionsService = new window.google.maps.DirectionsService();

  const fetchRoute = async (source, destination) => {
    try {
      const response = await getVehicleRoute(source, destination);
      setRoute(response);
    } catch (error) {
      console.error('Failed to fetch route data:', error);
    }
  };

  const calculateRoute = () => {
    directionsService.route({
      origin: source,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`Error fetching directions: ${result}`);
      }
    });
  };

  useEffect(() => {
    calculateRoute();
  }, [source, destination]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        <Marker position={center} />
      </GoogleMap>
      <div>
        <label>
          Source:
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Latitude,Longitude"
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Latitude,Longitude"
          />
        </label>
        <button onClick={() => fetchRoute(source, destination)}>Update Route</button>
      </div>
    </LoadScript>
  );
};

export default Map;
