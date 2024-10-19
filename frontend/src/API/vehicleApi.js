import axios from 'axios';

const API_URL = 'http://localhost:5000/api/vehicle-route';

export const getVehicleRoute = async (source, destination) => {
  try {
    const response = await axios.get(API_URL, {
      params: { source, destination }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vehicle route:', error);
    throw error;
  }
};
