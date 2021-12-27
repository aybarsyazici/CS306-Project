import { makeAutoObservable } from "mobx";
import { createContext, FC, useContext } from "react";
import { Game } from "../types/game";

class UserStore{
    username: string = "defualt username";
    cart: number[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addToCart(game: Game) {
        const index = this.cart.indexOf(game.gameid);
        if(index < 0)
            this.cart.push(game.gameid);
    }
    
    removeFromCart(game: Game) {
        const index = this.cart.indexOf(game.gameid);
        if(index > -1 )
            this.cart.splice(index,1)
    }
}

const StoreContext = createContext<UserStore>(new UserStore());

const StoreProvider: FC<{ store: UserStore }> = ({ store, children }) => {
    return (
        <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    )
}

const useStore = () => {
    return useContext(StoreContext);
}

export { UserStore, StoreProvider, useStore };