import React, {useMemo} from 'react';
import FavoritesPage from './FavoritesPage';
import LoginPage from './LoginPage';
import SearchPage from './SearchPage';
import { useUserContext} from '../context/UserContext';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent, requiresUser) => {
    return (props) => {
        const {user} = useUserContext();

        const redirectTo = useMemo (() => (requiresUser ? '/login' : '/search'), []);

        const authorized = useMemo (() => {
            return (!requiresUser && !user) || (requiresUser && user);
        }, [user]);

        if (authorized) {
            return <WrappedComponent {...props} />;
        }
        return <Navigate to={redirectTo} />;
    
    }
}

export const LoginPageWithAuth = withAuth(LoginPage, false);
export const SearchPageWithAuth = withAuth(SearchPage, true);
export const FavoritesPageWithAuth = withAuth(FavoritesPage, true);