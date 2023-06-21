import React, { createContext, useCallback, useContext, useReducer } from 'react';
import {
    ADD_FAVORITE,
    REMOVE_FAVORITE,
    CLEAR_FAVORITES,
    INITIAL_FAVORITE_STATE,
    favoritesReducer
} from '../reducers/favReducers';

const FavoritesContext = createContext(null);

export const useFavoritesContext = () => {
    return useContext(FavoritesContext);
}

export function FavoritesProvider  (props)  {
    const [favorites, dispatch] = useReducer(
        favoritesReducer, 
        INITIAL_FAVORITE_STATE);

    const addFavorite = useCallback(
        (gif) => {
             dispatch({ type: ADD_FAVORITE, payload: gif })

             fetch('http://localhost:3006/favorites', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                    body: JSON.stringify(gif)
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .then(error => console.log(error));
                },
        [dispatch]
    );

    const removeFavorite = useCallback(
        (gif_id) => {
            dispatch({ type: REMOVE_FAVORITE, payload: gif_id });
        }, 
        [dispatch]
    );

    const clearFavorites = useCallback(() => {
        dispatch({ type: CLEAR_FAVORITES })
    }, [dispatch]);

    return(
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
            {props.children}
        </FavoritesContext.Provider>
    )
}

