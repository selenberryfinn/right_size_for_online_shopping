import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// Controllers
import { getCartItems } from "../../controllers/actions";
import { useOutsideAlerter } from "../../controllers/hooks";
// Views

import CartItemComponent from "./cart-item-component";
import styled from "styled-components";
import { Cart } from "../style/icons";
const StyledCart = styled.a`
    position: relative;

    & > div {
        position: absolute;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        background: #f63366;
        border-radius: 50%;
        min-width: 19px;
        min-height: 19px;
        font-size: 12px;
    }
`;

const StyledCartItems = styled.div`
    position: absolute;
    top: 125px;
    right: 20px;
    width: 300px;
    min-height: 0px;
    background: ghostwhite;
    z-index: 2;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.1);
    max-height: 300px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        height: 12px;
        width: 7px;
        border-radius: 2px;
        background: transparent;
        transition: all 0.3s ease;
    }
    &::-webkit-scrollbar:hover {
        background: #dedede;
    }
    &::-webkit-scrollbar-thumb {
        background: #dedede;
        border-radius: 4px;
    }
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    display: block;
    width: 100%;
    padding: 10px 15px;
    background-color: #f63366;
    text-transform: uppercase;
    color: #fff;
    border: 0;
    border-radius: 0;
    text-decoration: none;
    outline: none;
    overflow: hidden;
    opacity: 1;
    transition: 350ms opacity ease-out;
    line-height: 1.4;
    cursor: pointer;
`;

const CartComponent = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartItems);
    const innerRef = useRef(null);

    const [isCartItemsVisible, setVisibility] = useState(false);
    // console.log("GETTING CART ITEMS", cartItems);
    useEffect(() => {
        dispatch(getCartItems());
    }, []);

    useOutsideAlerter(e => setVisibility(false), innerRef);

    const toggleCartItems = () => {
        setVisibility(!isCartItemsVisible);
    };

    if (!cartItems) {
        return null;
    }

    console.log("IN CART AFTER", cartItems);
    return (
        <React.Fragment>
            <StyledCart onClick={toggleCartItems}>
                {!!cartItems && cartItems.length != 0 && (
                    <div>{cartItems.length}</div>
                )}
                <Cart color="ghostwhite" />
                <span>Cart</span>
            </StyledCart>
            {!!isCartItemsVisible && (
                <StyledCartItems ref={innerRef}>
                    {!!cartItems && cartItems.length != 0 ? (
                        cartItems.map((item, index) => (
                            <CartItemComponent key={index} item={item} />
                        ))
                    ) : (
                        <div>Your cart is empty</div>
                    )}
                    <StyledLink to="/checkout">Go to payment</StyledLink>
                </StyledCartItems>
            )}
        </React.Fragment>
    );
};

export default CartComponent;
