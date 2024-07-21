import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../constant';

const AddBook = () => {

  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    description: '',
    publishedYear: '',
    genre: '',
    coverImage: '',
  });

  const handleInputChange = (event) => {
    setBookData({
      ...bookData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedBookData  = {
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      publishedYear: bookData.publishedYear,
      genre: bookData.genre.split(',').map((g) => g.trim()), 
      coverImage: bookData.coverImage,
    };

    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post(`${backendURL}/api/books/add`, formattedBookData , {
        headers: {
          'x-auth-token': token,
        },
      });

      if (response.status === 200) {
        alert('Book added successfully!');
        // Reset form fields
        setBookData({
          title: '',
          author: '',
          description: '',
          publishedYear: '',
          genre: '',
          coverImage: '',
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Add a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="title">
            Title:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            type="text"
            id="title"
            name="title"
            value={bookData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="author">
            Author:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            type="text"
            id="author"
            name="author"
            value={bookData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description:
          </label>
          <textarea
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            id="description"
            name="description"
            value={bookData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="publishedYear">
            Published Year:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            type="number"
            id="publishedYear"
            name="publishedYear"
            value={bookData.publishedYear}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="genre">
            Genre:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            type="text"
            id="genre"
            name="genre"
            value={bookData.genre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="coverImage">
            Cover Image URL:
          </label>
          <input
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
            type="text"
            id="coverImage"
            name="coverImage"
            value={bookData.coverImage}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          className="w-full px-4 py-2 bg-violet-600 text-white font-medium rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          type="submit"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
