import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Controllers
import { deleteCartItem } from "../../controllers/actions";
import { useFetchData } from "../../views/helpers";
import { X } from "../../views/style/icons";
// Views

import styled from "styled-components";

const StyledCartItemComponent = styled.div`
    height: 43px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-item: center;
    font-size: 12px;
    padding: 0 10px;

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-item: center;
        min-height: 100%;
        font-size: 12px;
        wrap: no-wrap;

        > span {
            width: 43px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-item: center;
        }
    }

    &:hover {
        background: #ddd;
    }

    & > svg:hover {
        color: red;
    }
`;

const CartItemComponent = ({ item }) => {
    const dispatch = useDispatch();

    const [product, setProduct] = useState();
    useEffect(() => {
        (async () => {
            let data = await useFetchData(`/api/products/${item.productId}`);
            setProduct(data[0]);
        })();
    }, []);

    const removeItem = async () => {
        console.log("IN CartItemComponent removeItem", item.id);
        const data = await useFetchData(`/api/carts/${item.id}/delete`, {});
        if (data[0].data == "success") {
            dispatch(deleteCartItem(item.id));
            // socket.emit("addCartItem", item);
        }
    };

    if (!product) {
        return null;
    }

    return (
        <StyledCartItemComponent>
            <div>{product.productName}</div>

            <div>{product.price} EUR</div>
            <div onClick={removeItem}>
                <span>
                    <X />
                </span>
            </div>
        </StyledCartItemComponent>
    );
};

export default CartItemComponent;
