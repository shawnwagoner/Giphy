import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useSearchContext } from '../context/SearchContext';

const Menu = () => {
  const { user, clearUser } = useUserContext();
  const { clearFavorites } = useFavoritesContext();
  const { clearSearchResults } = useSearchContext();
  return (
    <nav>
    {!user && (
      <Link to="/login">Login</Link>)}
      {user && (<ul>
            <li>
            <Link to="/login" onClick={() => {
              clearUser();
              clearFavorites();
              clearSearchResults();
            }}>
            Logout
            </Link>
            </li>
            <li>
            <Link to="/favorites">Favorites</Link>
            </li>
            <li>
            <Link to="/search">Search</Link>
            </li>
        </ul>
      )}
    </nav>
  )
};

export default Menu;