import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BuyGame from "./buygame";

import Games from "./games";
import Invoices from "./invoices";
import Users from "./users";
import { HomePage } from "./views/home";
import "./App.scss";
import CartPage from "./views/cart";
import LoginPage from "./views/login";
import { observer } from "mobx-react-lite";
import { useStore } from "./stores/userStore";

export const App = observer(() => {
  const user = useStore();

  return (
    <Router>
      <Routes>
        {user.username !== "" ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin-games" element={<Games />} />
            <Route path="/admin-users" element={<Users />} />
            <Route path="/admin-buygame" element={<BuyGame />} />
            <Route path="/admin-invoices" element={<Invoices />} />
          </>
        ) : (
          <Route path="*" element={<LoginPage />} />
        )}
      </Routes>
    </Router>
  );
});

export default App;
