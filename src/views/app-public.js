// VIEW

import React from "react";
import { HashRouter, Route } from "react-router-dom";
// Views
import PublicPage from "./page/public-page";

// Theme
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./style/variables.scss');

const AppPublic = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <Route exact path="/" component={PublicPage} />
                    <Route path="/login" component={PublicPage} />
                    <Route path="/user-new" component={PublicPage} />

                    <Route exact path="/products" component={PublicPage} />
                    <Route path="/products/:id" component={PublicPage} />
                    <Route exact path="/categories" component={PublicPage} />
                    <Route path="/categories/:id" component={PublicPage} />
                </HashRouter>
            </ThemeProvider>
        </React.Fragment>
    );
};

export default AppPublic;
