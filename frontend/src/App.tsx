import {
    BrowserRouter as Router, Route, Routes,
  } from 'react-router-dom';
import BuyGame from './buygame';

import Games from './games';
import Invoices from './invoices';
import Users from './users';
import { HomePage } from './views/home';
import './App.scss';
import CartPage from './views/cart';
 
  
  export function App() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/cart"
            element={<CartPage />}
          />
          <Route
            path="/admin-games"
            element={<Games />}
          />
           <Route
            path="/admin-users"
            element={<Users />}
          />
          <Route
            path="/admin-buygame"
            element={<BuyGame />}
          />
          <Route
            path="/admin-invoices"
            element={<Invoices />}
          />
        </Routes>
      </Router>
    );
  }
  
  export default App;
  