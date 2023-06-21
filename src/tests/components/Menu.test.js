import React from "react";
import { render, fireEvent} from "@testing-library/react";
import Menu from "../../components/Menu";
import '@testing-library/jest-dom';
import { useUserContext } from "../../context/UserContext";
import {useFavoritesContext} from "../../context/FavoritesContext";
import { BrowserRouter } from "react-router-dom";
import {useSearchContext} from "../../context/SearchContext";

jest.mock("../../context/UserContext", () => ({
    useUserContext: jest.fn(),
}));

jest.mock("../../context/FavoritesContext", () => ({
    useFavoritesContext: jest.fn(),
}));

jest.mock("../../context/SearchContext", () => ({
    useSearchContext: jest.fn(),
}));


describe("Menu", () => {
   beforeEach(() => {
    useUserContext.mockReturnValue({
        user: null,
        setUser: jest.fn(),
        clearUser: jest.fn(),
    });

    useFavoritesContext.mockReturnValue({
        favorites: [],
        addFavorite: jest.fn(),
        removeFavorite: jest.fn(),
        clearFavorites: jest.fn(),
});
    
    useSearchContext.mockReturnValue({
        searchResults: [],
        setSearchResults: jest.fn(),
        clearSearchResults: jest.fn(),
    });
});
   
    it("should display login button when user is not logged in", () => {
       useUserContext.mockReturnValue({
        user: null,
        setUser: jest.fn(),
        clearUser: jest.fn(),
    });

       const { getByText } = render(
            <BrowserRouter>
                <Menu />
            </BrowserRouter>
        );

         
        
            const loginLink = getByText("Login");
        expect("loginLink").toBeInTheDocument();
    });
});



