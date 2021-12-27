import { Container } from 'react-bootstrap';
import { NavigationBar } from '../components/navigationbar';
import { observer } from "mobx-react-lite";

import user from "../stores/userStore";
 
export const HomePage = () => {
    return (
        <>
        <NavigationBar/>
        <Container>
                <div>welcome to home page { user.username }</div>
        </Container>
        </>
    );
}
 
export default observer(HomePage);