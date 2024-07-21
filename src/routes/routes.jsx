import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import AddBook from '../pages/AddBook.jsx';
import Favorites from '../pages/Favorites.jsx';
import Layout from '../layout/Layout.jsx';
import useAuth from '../hooks/useAuth.jsx';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-book"
          element={isAuthenticated ? <AddBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/favorites"
          element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />}
        />
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
