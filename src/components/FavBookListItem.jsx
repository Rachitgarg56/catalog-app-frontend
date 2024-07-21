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

    </div>
  );
};

export default BookListItem;
