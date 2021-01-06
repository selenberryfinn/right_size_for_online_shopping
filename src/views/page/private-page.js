// VIEW
import React from "react";
import styled from "styled-components";

// Views
import LandingPage from "../content/landing-page";
import CategoriesPage from "../content/categories-page";
import CategoryPage from "../content/category-page";
import UserAccount from "../content/user-account-page";
import MerchantAccount from "../content/merchant-account-page";
import ProductPage from "../content/product-page";

import UserNew2 from "../forms/user-new-2";
import UserNew3 from "../forms/user-new-3";
import UserNew4 from "../forms/user-new-4";
import UserLogout from "../forms/user-logout";
import ProductNew from "../forms/product-new";
import ProductEdit from "../forms/product-edit";

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
import PrivateHeader from "../header/private-header";
import PrivateFooter from "../footer/private-footer";

const PrivatePage = props => {
    const { path } = props.match;
    const { id } = props.match.params;
    let content;

    if (path == "/user-new-2") {
        content = <UserNew2 />;
    }
    if (path == "/user-new-3") {
        content = <UserNew3 />;
    }
    if (path == "/user-new-4") {
        content = <UserNew4 />;
    }

    if (path == "/") {
        content = <LandingPage />;
    }
    if (path == "/user-account") {
        content = <UserAccount />;
    }
    if (path == "/merchant-account") {
        content = <MerchantAccount />;
    }
    if (path == "/product-new") {
        content = <ProductNew />;
    }
    if (path == `/product-edit/:id`) {
        content = <ProductEdit {...props} />;
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
    if (path == "/logout") {
        content = <UserLogout />;
    }
    if (path == `/categories/:id`) {
        // content = <CategoriesPage />;
        content = <CategoryPage {...props} />;
    }

    return (
        <PublicWrapper>
            <PrivateHeader />
            <OuterContent>
                <InnerContent>{content}</InnerContent>
            </OuterContent>
            <PrivateFooter />
        </PublicWrapper>
    );
};

export default PrivatePage;
