import axios from 'axios';

const API_KEY = '3';  // Free API key
const API_URL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;

// Function to fetch MLS upcoming fixtures
const fetchMLSUpcomingFixtures = async () => {
  try {
    const response = await axios.get(`${API_URL}/eventsnextleague.php?id=4346`);
    if (response.data.events) {
      // console.log("MLS Upcoming Fixtures:", response.data.events);
      return response.data.events;
    } else {
      console.log("No upcoming MLS fixtures found.");
      return [];
    }
  } catch (error) {
    console.error('Error fetching MLS upcoming fixtures:', error);
    return [];
  }
};

// Call the function to test
fetchMLSUpcomingFixtures();
 
export const fetchUpcomingGames = fetchMLSUpcomingFixtures; // Ensure correct export
