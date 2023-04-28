import { FavoritesProvider } from "./FavoritesContext";
import { UserProvider } from "./UserContext";
import { SearchProvider } from "./SearchContext";

export default function StateProvider(props) {
    return (
        <UserProvider>
            <SearchProvider>
                <FavoritesProvider>
                    {props.children}
                </FavoritesProvider>
            </SearchProvider>
        </UserProvider>
    )
}