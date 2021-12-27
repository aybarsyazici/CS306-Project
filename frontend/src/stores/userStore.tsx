import { makeAutoObservable, observable } from "mobx";
import { createContext, FC, useContext } from "react";
import { Game } from "../types/game";


class UserStore{
    username: string = "";
    userid: number | null = null;
    email: string | null = null;
    password: string | null = null;
    cart: Map<number, Game> = observable.map();

    constructor() {
        makeAutoObservable(this);
    }

    addToCart(game: Game) {
        this.cart.set(game.gameid, game);
    }
    
    removeFromCart(game: Game) {
        this.cart.delete(game.gameid);
    }

    get gameList() {
        return [...this.cart.values()];
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