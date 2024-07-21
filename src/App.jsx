import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes.jsx';
import { createContext, useState } from 'react';

export const BookContext = createContext();

function App() {

  const [books, setBooks] = useState([]);
  const [queriedBooks, setQueriedBooks] = useState([]);

  return (
    <BookContext.Provider value={{books, setBooks, queriedBooks, setQueriedBooks}}>
      <Router>
        <AppRoutes />
      </Router>
    </BookContext.Provider>
  );
}

export default App;
