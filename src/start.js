// Models
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer } from "./models/reducer";

// Controllers
import { init } from "./controllers/socket";
import AppPrivate from "./views/app-private";
import AppPublic from "./views/app-public";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
console.log(location.pathname);
const isLoggedIn = location.pathname == "/p";
init(store);
ReactDOM.render(
    <Provider store={store}>
        {!isLoggedIn ? <AppPublic /> : <AppPrivate />}
    </Provider>,
    document.querySelector("main")
);
