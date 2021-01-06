import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// Controllers
import { addCartItem } from "../../controllers/actions";
// Views

import styled from "styled-components";

import { useFetchData } from "../../views/helpers";
import { Cart } from "../style/icons";

const StyledAddToCartButton = styled.a`
    font-size: 16px;
    display: block;
    width: 100%;
    max-width: 350px;
    padding: 15px 20px;
    background-color: #333;
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

    & > span {
        padding: 7px 3px;
    }

    &:hover {
    }
`;

const AddToCartButton = props => {
    const { id } = props.match.params;
    const { size } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log("IN BBUTTON", id, size);
    }, [size]);

    const addToCart = async () => {
        if (size != 0 && !!id) {
            let item = {
                productId: id,
                size
            };
            // console.log("IN AddToCartButton", item);
            const data = await useFetchData("/api/carts", item);
            if (data[0].data == "success") {
                dispatch(addCartItem(item));
                // socket.emit("addCartItem", item);
            }
        }
    };

    if (!props) {
        return null;
    }
    return (
        <StyledAddToCartButton onClick={addToCart}>
            <Cart height="12" color="#666" />
            <span>Add to basket</span>
        </StyledAddToCartButton>
    );
};

export default AddToCartButton;
