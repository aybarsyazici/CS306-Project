import {
    BrowserRouter as Router, Route, Routes,
  } from 'react-router-dom';
import BuyGame from './buygame';

import Games from './games';
import Invoices from './invoices';
import Users from './users';
 
  
  export function App() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Games />}
          />
          <Route
            path="/games"
            element={<Games />}
          />
           <Route
            path="/users"
            element={<Users />}
          />
          <Route
            path="/buygame"
            element={<BuyGame />}
          />
          <Route
            path="/invoices"
            element={<Invoices />}
          />
        </Routes>
      </Router>
    );
  }
  
  export default App;
  