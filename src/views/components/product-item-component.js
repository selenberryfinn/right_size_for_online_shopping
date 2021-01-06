import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Views
import styled from "styled-components";

// Style

const StyledProductItem = styled.ul`
    list-style-type: none;
    width: ${props => (props.cols ? `calc(800px / ${props.cols})` : "200px")};
    height: ${props =>
        props.cols ? `calc(800px / ${props.cols} * 1.5)` : "350px"};
    background: transparent;
    display: inline-flex;
    flex-direction: column;
    justify-content: space-around;

    align-content: stretch;
    margin: 3px;

    & > a {
        width: 100%;
        height: 100%;
        cursor: pointer;
        text-decoration: none;
        position: relative;
        padding: 25px;
    }

    & > a img {
        height: 55%;
        width: 100%;
        object-fit: cover;
    }

    & > a span {
        height: calc((100% - 55%) / 5 * 1);
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Raleway";
        color: #666;
    }
    & > a span:nth-child(2) {
        height: calc((100% - 55%) / 5 * 2);
        text-align: center;
        align-items: flex-end;
        font-size: 16px;
        line-height: 18px;
        color: #333;
        text-transform: uppercase;
    }
    & > a span:nth-child(4) {
        font-size: 16px;
        color: #111;
        text-transform: uppercase;
    }
    & > a span:nth-child(5) {
        color: #fff;
        transition: 350ms all ease-in-out;
    }

    & > a:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: 200ms all ease-in-out;
    }
    & > a:hover:after {
        border-radius: 3px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.1);
        top: 10px;
        left: 10px;
        right: 10px;
        bottom: 10px;
    }
    & > a:hover span:nth-child(5) {
        color: #666;
    }
`;

const ProductItemComponent = ({ cols, item }) => {
    const [itemHeight, setPhotoHeight] = useState("");
    let itemCollage = React.createRef();

    useEffect(() => {
        if (itemCollage) {
            setPhotoHeight(itemCollage.clientWidth);
        }
    }, [itemHeight]);

    if (!item) {
        return null;
    }

    return (
        <StyledProductItem
            ref={ref => (itemCollage = ref)}
            height={itemHeight}
            cols={cols}
        >
            <Link to={`/products/${item.productId}`}>
                <img
                    src={item.url || "/images/default.png"}
                    alt={item.productSlug}
                />
                <span>{item.productName}</span>
                <span>{item.productCaption}</span>
                <span>{item.price} EUR</span>
                <span>Sizes</span>
            </Link>
        </StyledProductItem>
    );
};

export default ProductItemComponent;
