import { makeObservable, observable } from "mobx";
import { Game } from "../types/game";

class UserStore{
    username: string = "defualt username";
    cart: Map<number,Game> = new Map();

    constructor() {
        makeObservable(this, {
            username: observable,
            cart: observable,
        });
    }

    addToCart(game: Game) {
        this.cart.set(game.gameid, game)
    }
    
    removeFromCart(game: Game) {
        this.cart.delete(game.gameid);
    }
}

export const user = new UserStore();
export default user;