import { useState } from 'react';
import axios from 'axios';
import { backendURL } from '../constant';

const BookListItem = ({ book }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/users/favorites`, {
        bookId: book._id, 
      }, {
        headers: {
          'x-auth-token': localStorage.getItem('token'), 
        }
      });

      if (response.status === 200) {
        setIsFavorited(true); 
        alert('Book added to favorites!'); 
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add book to favorites.'); 
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full p-4 border border-gray-300 transition-transform transform hover:scale-105">
      <img
        src={book.coverImage}
        alt={book.title}
        className="w-full h-72 object-cover mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-1">by {book.author}</p>
      <p className="text-gray-600 mb-1">Published in {book.publishedYear}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        {book.genre.map((genre, index) => (
          <span
            key={index}
            className="bg-violet-100 text-violet-800 px-2 py-1 rounded-full text-sm"
          >
            {genre}
          </span>
        ))}
      </div>
      <p className="text-gray-700 mb-2">{book.description}</p>

      <button
        onClick={handleAddToFavorites}
        className={`flex items-center justify-center w-full p-2 rounded-md ${isFavorited ? 'bg-gray-300' : 'bg-violet-600 hover:bg-violet-700'} text-white font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2`}
        disabled={isFavorited} // Disable button if already favorited
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a1 1 0 01-.707-.293l-6-6a1 1 0 011.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 1.414l-6 6A1 1 0 0110 18z"
            clipRule="evenodd"
          />
        </svg>
        {isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default BookListItem;
