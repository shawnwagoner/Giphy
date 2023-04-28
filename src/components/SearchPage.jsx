import {React, useState} from 'react';
import Button from '../styles/elements/Button';
import Gifs from '../functions/Gifs';
import {useFavoritesContext} from '../context/FavoritesContext';
import {useQuery} from 'react-query';
import GifDisplay from './GifDisplay';


const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [url, setUrl] = useState();
    const [rating, setRating] = useState('g');
    const {favorites, addFavorites, removeFavorites} = useFavoritesContext();
    const {isLoading, error, isSuccess, data: searchResults } = useQuery(["Gifs", url], () => Gifs(url), {
        enabled: !!url,
     
        
       
    });
        
        
      return (
        <div>
          <h1>Search</h1>
          <form>
            <input
              placeholder='Search for a gif'
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value='g'>G</option>
              <option value='pg'>PG</option>
              <option value='pg-13'>PG-13</option>
              <option value='r'>R</option>
            </select>
            <Button
              disabled={searchTerm.length < 3}
              onClick={(e) => {
                e.preventDefault();
                if (searchTerm.length >= 3) {
                  setUrl(`&q=${searchTerm}&rating=${rating}`);
                }
              }}
            >
            Search
            </Button>
          </form>
          {isLoading && <p>Loading...</p>}
          {error && <p>An error has occurred: {error.message}</p>}
          {isSuccess && 
           searchResults.map((val) => (
            <GifDisplay
              key={val.gif_id}
              url={val.url}
              title={val.title}
              gif_id={val.gif_id}
              addFavorites={addFavorites}
              removeFavorites={removeFavorites}
              isFavorites={favorites.some((fav) => fav.gif_id === val.gif_id)}
              />
          ))}

        </div>
      );
    };
    
    export default SearchPage;