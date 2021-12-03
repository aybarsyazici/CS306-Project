import {
    BrowserRouter as Router, Route, Routes,
  } from 'react-router-dom';

import Games from './games';
 
  
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
        </Routes>
      </Router>
    );
  }
  
  export default App;
  