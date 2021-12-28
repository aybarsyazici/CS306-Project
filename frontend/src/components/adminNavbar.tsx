import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

 
export const AdminNavBar = () => {
    return (
        <Navbar bg="light" variant="dark">
        <Container>
        <Navbar.Brand href="#">ADMIN PANEL</Navbar.Brand>
        <Nav className="me-auto">
          <Link to="/admin-games">Admin Games</Link>
          <Link to="/admin-buygame">Admin BuyGames</Link>      
          <Link to="/admin-users">Admin Users</Link>
          <Link to="/">User Dashboard</Link>             
        </Nav>
        </Container>
      </Navbar>
    );
}
 
export default AdminNavBar;