import { useContext, useEffect } from "react"
import { BookContext } from '../App.jsx';
import axios from "axios";
import BookListItem from "../components/BookListItem.jsx";
import SearchBooks from "../components/SearchBooks.jsx";
import { backendURL } from "../constant.js";

const Home = () => {

  const { books, setBooks, queriedBooks } = useContext(BookContext);
  
  const getBooks = async () => {
    const res = await axios.get(`${backendURL}/api/books`);
    setBooks(res.data);
  }

  useEffect(() => {
    getBooks()
  }, []);

  return (
    <div className="p-8">

      <SearchBooks />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {
          queriedBooks.length > 0 
          ?
          queriedBooks.map((book, index) => (
            <BookListItem key={book._id} book={book} />
          )) 
          :
          books.map((book, index) => (
            <BookListItem key={book._id} book={book} />
          ))
        }
      </div>
    </div>
  )
}

export default Home
