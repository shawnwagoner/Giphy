import React from 'react';
import Button from '../styles/elements/Button';

const GifDisplay = ({url, title, gif_id, addFavorite, removeFavorite, isFavorite}) => {
    
   
    
    return (
        <div>
            <h4>
                {title}
            </h4>
            <img src={url} alt={title} title={title} />
            {!isFavorite && <Button onclick={() => addFavorite(gif_id)}>
                Add Favorite
            </Button>}
            {isFavorite &&
            <Button onclick={() => removeFavorite(gif_id)}>
                Remove Favorite
            </Button>}
        </div>
    )
}

export default GifDisplay;