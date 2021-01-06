// VIEW

import React from "react";
import { HashRouter, Route } from "react-router-dom";

// Controllers
import axios from "../models/axios_csurf";

// Views
import PrivatePage from "./page/private-page";

// Theme
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./style/variables.scss');

const AppPrivate = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Route exact path="/" component={PrivatePage} />
                    <Route exact path="/user-new-2" component={PrivatePage} />
                    <Route exact path="/user-new-3" component={PrivatePage} />
                    <Route exact path="/user-new-4" component={PrivatePage} />
                    <Route path="/user-account" component={PrivatePage} />
                    <Route path="/merchant-account" component={PrivatePage} />
                    <Route path="/product-new" component={PrivatePage} />
                    <Route path="/product-edit/:id" component={PrivatePage} />

                    <Route exact path="/products" component={PrivatePage} />
                    <Route path="/products/:id" component={PrivatePage} />
                    <Route exact path="/categories" component={PrivatePage} />
                    <Route path="/categories/:id" component={PrivatePage} />
                </HashRouter>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default AppPrivate;
