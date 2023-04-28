import './App.css';
import { 
  BrowserRouter as Router,
Routes, 
Route,
Navigate} 
from 'react-router-dom';
import Menu from './components/Menu'
import {LoginPageWithAuth} from './components/ProtectedRoutes'
import {SearchPageWithAuth} from './components/ProtectedRoutes'
import {FavoritesPageWithAuth} from './components/ProtectedRoutes'

function App() {
  return (
    <Router>
      <Menu/>
       <Routes>
        <Route path='/login' element={<LoginPageWithAuth/>}/>
        <Route path='/search' element={<SearchPageWithAuth/>}/>
        <Route path='/favorites' element={<FavoritesPageWithAuth/>}/>
        <Route path='*' element={<Navigate to='/login'/>}/>
       </Routes>
    </Router>
  );
}

export default App;
