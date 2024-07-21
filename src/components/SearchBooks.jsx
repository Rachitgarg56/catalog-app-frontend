import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BookContext } from '../App';
import { backendURL } from '../constant';

const SearchBooks = () => {
  const { books, setQueriedBooks } = useContext(BookContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // Adjust the delay as needed (300ms here)

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (debouncedSearchTerm === '') {
        setQueriedBooks(books);
        return;
      }

      try {
        const response = await axios.get(`${backendURL}/api/books/search?q=${debouncedSearchTerm}`);
        setQueriedBooks(response.data);
      } catch (err) {
        console.log('Failed to fetch books. Please try again.');
      }
    };

    fetchBooks();
  }, [debouncedSearchTerm, books, setQueriedBooks]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Search for books title, author, genre..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-600"
        />
      </form>
    </div>
  );
};

export default SearchBooks;
