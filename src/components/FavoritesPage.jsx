import React, {useEffect} from 'react';
import {useFavoritesContext} from '../context/FavoritesContext';
import GifDisplay from './GifDisplay';


const FavoritesPage = () => {
    const {favorites, removeFavorite} = useFavoritesContext();
   
    useEffect(() => {
       
        console.log(favorites.url)
        }, [favorites]);
   
   
    return ( 
        <div>
    <h1>Favorites</h1>
        {favorites.map((value) => {
            return (
            <GifDisplay
            key={value.gif_id}
            gif_id={value.gif_id}
            url={value.url}
            isFavorite={true}   
            removeFavorite={removeFavorite}

            />
            ) 
        })}
        </div>
    );
};

export default FavoritesPage;