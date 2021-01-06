// CONTROLLER
import * as io from "socket.io-client";
import { useFetchData } from "../views/helpers";
// Controllers
import { addCartItem } from "./actions";
export let socket;

export const init = store => {
    if (!socket) {
        socket = io.connect();

        socket.on("addCartItem", item => {
            console.log("IN SOCKET.JS addCartItem", item);
            // store.dispatch(addCartItem(item));
        });
    }
};
