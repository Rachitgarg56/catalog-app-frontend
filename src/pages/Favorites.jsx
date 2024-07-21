import { useState, useEffect } from 'react';
import axios from 'axios';
import FavBookListItem from '../components/FavBookListItem.jsx';
import { backendURL } from '../constant.js';

const Favorites = () => {
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // Retrieve user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        
        // Check if user exists in localStorage
        if (!user || !user._id) {
          console.error('User data not found in localStorage');
          return;
        }

        const userId = user._id; // Get the userId from localStorage
        
        // Fetch user's favorite books
        const response = await axios.get(`${backendURL}/api/users/${userId}/favorites`, {
          headers: {
            'x-auth-token': `${localStorage.getItem('token')}` // Include token in the request
          }
        });
        
        // Update state with favorite books
        setFavoriteBooks(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="p-8 border border-solid border-black">
      <h1 className="text-2xl font-bold mb-4">Favorite Books</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 border border-solid border-black">
        {
          favoriteBooks.map((book) => (
            <FavBookListItem key={book._id} book={book} />
          ))
        }
      </div>
    </div>
  );
};

export default Favorites;

