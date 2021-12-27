import { Container } from 'react-bootstrap';
import { NavigationBar } from '../components/navigationbar';
 
export const HomePage = () => {
    return (
        <>
        <NavigationBar/>
        <Container>
            <div>welcome to home page</div>
        </Container>
        </>
    );
}
 
export default HomePage;