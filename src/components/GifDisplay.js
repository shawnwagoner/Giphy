import React from 'react';
import Button from '../styles/elements/Button';

const GifDisplay = ({url, title, gif_id, addFavorite, removeFavorite, isFavorite}) => {
    
   
    
    return (
        <div>
            <h4>
                {title}
            </h4>
            <img src={url} alt={title} title={title} />
            {!isFavorite && <Button onClick={() => addFavorite(gif_id)}>
                Add Favorite
            </Button>}
            {isFavorite &&
            <Button onClick={() => removeFavorite(gif_id)}>
                Remove Favorite
            </Button>}
        </div>
    )
}

export default GifDisplay;