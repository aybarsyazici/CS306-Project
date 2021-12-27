import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import NavigationBar from "../components/navigationbar";
import { useStore } from "../stores/userStore";

interface CartPageProps {
    
}
 
const CartPage = observer(() => {


    const user = useStore();


    return (
        <>
            <NavigationBar />
            {user.gameList.map((game) => <p>{game.name}</p>)}
        </>
    );
})

export default CartPage;