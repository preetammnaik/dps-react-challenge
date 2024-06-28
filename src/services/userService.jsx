import axios from 'axios';

export const getUsers = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    return response.data.users;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};