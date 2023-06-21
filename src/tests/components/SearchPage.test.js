import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery } from "react-query";
import { useSearchContext } from '../../context/SearchContext';
import { useFavoritesContext } from '../../context/FavoritesContext';
import SearchPage from '../../components/SearchPage';


jest.mock('../../context/SearchContext', () => ({
    useSearchContext: jest.fn(),
}));

jest.mock('../../context/FavoritesContext', () => ({
    useFavoritesContext: jest.fn(),
}));

jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    useQuery: jest.fn(),
}));


describe('Search Page', () => {
    it('should set the correct url when the search button is clicked', () => {
        const setSearchResults = jest.fn();
        const addFavorite = jest.fn();
        const removeFavorite = jest.fn();

        useSearchContext.mockReturnValue({
            searchResults: [],
            setSearchResults,
        });

        useFavoritesContext.mockReturnValue({
            favorites: [],
            addFavorite,
            removeFavorite,
        });

        useQuery.mockReturnValue({
            isLoading: false,
            error: null,
            isSuccess: true,
            data: [
                {
                    gif_id: '123',
                    title: 'funny cat',
                    url: 'https://giphy.com/gifs/funny-cat',
                },
            ],
        });

        const { getByPlaceholderText, getByText } = render(
            <SearchPage />
        );

        const searchInput = getByPlaceholderText('Search for a gif');
        const searchButton = getByText('Search');

        fireEvent.change(searchInput, { target: { value: 'funny cat' } });

       
        const useStateSpy = jest.spyOn(React, 'useState');
        const setUrl = jest.fn();
       

        useStateSpy.mockImplementation(() => [
           setUrl 
        ]);
        
        fireEvent.click(searchButton);

        expect(setUrl).toHaveBeenCalledWith("&q=funny cat&rating=g");
    });
});


   