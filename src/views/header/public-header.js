import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// VIEW
import NavComponent from "../components/nav-component";
import CartComponent from "../components/cart-component";
import SearchBar from "../forms/search-bar";
import { Outer, Inner } from "../style/global";
import { User, Cart, Search } from "../style/icons";

const HeaderWrapper = styled.header`
    width: 100%;
    flex: none;
`;

const Top = styled(Outer)`
    height: 43px;
    background: ghostwhite;
`;

const Main = styled(Outer)`
    height: 95px;
    background: #203139;
`;

const Nav = styled(Outer)`
    height: 35px;
    background: #222d32;
`;

const InnerTop = styled(Inner)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 12px;
`;

const InnerMain = styled(Inner)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled(Link)`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-size: 35px;
    font-weight: 600;
    color: ghostwhite;
    cursor: pointer;
    text-decoration: none;
`;

const StyledSearchBar = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #f63366;

    & > div {
        width: 400px;
        height: 43px;
        margin: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    & > div input {
        width: calc(100% - 43px);
        height: 100%;
        padding: 16px 7px;
        border: none;
    }

    & > div input:focus {
        outline: 0;
    }
    & > div svg {
        width: 43px;
    }
`;

const StyledSearchResult = styled.span`
    position: absolute;
    top: 43px;
    min-height: 0px;
    z-index: 2;
    background: #fefefe;
    width: 100%;

    & > a {
        font-size: 12px;
        color: #111;
        display: block;
        width: 100%;
        text-decoration: none;
        background: #fff;
        padding: 7px 16px;
    }

    & > a:hover {
        background-color: #eee;
    }
`;

const MiniLoginNav = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    font-size: 11px;
    cursor: pointer;
    margin-right: 5px;
    height: 50px;

    & > a {
        color: ghostwhite;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        height: 100%;
        width: 35px;
        text-decoration: none;
        text-align: center;

        & > span:nth-child(2) {
            line-height: 10px;
            margin-top: 1px;
            color: #fff;
            font-weight: 300;
            font-family: "Work Sans";
            padding: 3px 0;
        }
    }
`;

const InnerNav = styled(Inner)`
display: flex;
flex-direction: row;
justify-content: center
align-items: center;
font-family: "Work Sans";
`;

const PublicHeader = () => {
    const categories = useSelector(state => state.categories);
    const [searchResult, setSearchResult] = useState([]);

    const handleSearchResult = result => {
        result ? setSearchResult(result) : setSearchResult([]);
    };

    return (
        <HeaderWrapper>
            <Top>
                <InnerTop>
                    Free shipping on €100 orders or more | Shop from the best
                    independent stores
                </InnerTop>
            </Top>
            <Main>
                <InnerMain>
                    <StyledLogo to="/"> logo</StyledLogo>
                    <StyledSearchBar>
                        <div>
                            <SearchBar
                                callback={result => handleSearchResult(result)}
                            />
                            <Search color="ghostwhite" strokeWidth="2" />
                        </div>
                        <StyledSearchResult>
                            {!!searchResult &&
                                searchResult.map(product => {
                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.id}`}
                                        >
                                            {product.productName}
                                        </Link>
                                    );
                                })}
                        </StyledSearchResult>
                    </StyledSearchBar>
                    <MiniLoginNav>
                        <Link to="/login">
                            <User color="ghostwhite" />
                            <span>Login</span>
                        </Link>
                        <CartComponent />
                    </MiniLoginNav>
                </InnerMain>
            </Main>
            <Nav>
                <InnerNav>
                    <NavComponent items={categories} cols="6" width="100%" />
                </InnerNav>
            </Nav>
        </HeaderWrapper>
    );
};

export default PublicHeader;
