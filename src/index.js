import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StateProvider from './context/index';
import {UserProvider} from './context/UserContext';
import {ThemeProvider} from './styles/Themes/ThemeProvider';
import {QueryClient, QueryClientProvider} from 'react-query';


const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
       <UserProvider>
          <StateProvider>
           <App />
        </StateProvider>
       </UserProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);

