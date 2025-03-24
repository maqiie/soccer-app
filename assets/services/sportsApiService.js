import axios from 'axios';

const API_URL = 'https://www.thesportsdb.com/api/v1/json/2';

// Function to fetch upcoming soccer games
export const fetchUpcomingGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/eventsnextleague.php?id=4396`);
    return response.data.events;
  } catch (error) {
    console.error('Error fetching upcoming games:', error);
    throw error;
  }
};
