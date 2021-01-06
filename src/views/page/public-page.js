// VIEW
import React from "react";
import styled from "styled-components";

// Views
import LandingPage from "../content/landing-page";
import CategoriesPage from "../content/categories-page";
import CategoryPage from "../content/category-page";
import ProductPage from "../content/product-page";

import UserNew from "../forms/user-new";
import UserLogin from "../forms/user-login";

import { Outer, Inner } from "../style/global";

export const PublicWrapper = styled.header`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

export const OuterContent = styled(Outer)`
    flex: auto;
    min-height: 50vh;
    /* overflow-y: scroll; */
    /* -webkit-overflow-scrolling: touch; */
`;

export const InnerContent = styled(Inner)``;

// Styled-components
import PublicHeader from "../header/public-header";
import PublicFooter from "../footer/public-footer";

const PublicPage = props => {
    const { path } = props.match;
    const { id } = props.match.params;
    let content;

    if (path == "/") {
        content = <LandingPage />;
    }
    if (path == "/categories") {
        content = <CategoryPage />;
    }
    if (path == "/login") {
        content = <UserLogin />;
    }
    if (path == "/user-new") {
        content = <UserNew />;
    }

    if (path == `/products/:id`) {
        content = <ProductPage {...props} />;
    }
    if (path == "/products") {
        content = <CategoriesPage />;
    }
    if (path == "/categories") {
        content = <CategoriesPage />;
    }
    if (path == `/categories/:id`) {
        // content = <CategoriesPage />;
        content = <CategoryPage {...props} />;
    }

    return (
        <PublicWrapper>
            <PublicHeader />
            <OuterContent>
                <InnerContent>{content}</InnerContent>
            </OuterContent>
            <PublicFooter />
        </PublicWrapper>
    );
};

export default PublicPage;
