import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useUserContext } from '../../context/UserContext';
import LoginPage from '../../components/LoginPage';

jest.mock('../../context/UserContext', () => ({
    useUserContext: jest.fn(),
}));

describe('Login Page', () => {
    beforeEach(() => {
        // Set default return values before each test
        useUserContext.mockReturnValue({
            user: null,
            setUser: jest.fn(),
            clearUser: jest.fn(),
        });
    });


    it('should render login page', () => {
        // render the component directly without UserProvider since we're mocking it ourselves
        const { getByPlaceholderText, getByTestId } = render(
            <LoginPage />
        );

        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByTestId('button');

       

        // enter less than 4 characters
        fireEvent.change(usernameInput, { target: { value: 'abc' } });
        fireEvent.change(passwordInput, { target: { value: '123' } });
        
        
        

        // enter 4 characters
        fireEvent.change(usernameInput, { target: { value: 'abcd' } });
        fireEvent.change(passwordInput, { target: { value: '1234' } });

        // button should now be enabled
        expect(loginButton).not.toBeDisabled();
    });

    it('should set username when login button is clicked', () => {
        const setUser = jest.fn();
        const mockContextValue = { setUser, user: null, clearUser: jest.fn() };

        // Set the return value of the useUserContext hook
        useUserContext.mockReturnValue(mockContextValue);

        const { getByPlaceholderText, getByTestId } = render(
            <LoginPage />
        );

        const usernameInput = getByPlaceholderText('Username');
        const passwordInput = getByPlaceholderText('Password');
        const loginButton = getByTestId('button');

        fireEvent.change(usernameInput, { target: { value: 'abcd' } });
        fireEvent.change(passwordInput, { target: { value: '1234' } });

        fireEvent.click(loginButton);

        expect(setUser).toHaveBeenCalledWith({ username: 'abcd' });
    });
});