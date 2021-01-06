import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Views
import styled from "styled-components";

// Style

const StyledItemCollage = styled.ul`
    list-style-type: none;
    text-align: center;
    width: 100%;
    background: ghostwhite;

    & > li {
        display: inline-flex;
        height: ${props => (props.height ? `${props.height}` : "160px")};
        width: ${props =>
        props.cols ? `calc(1200px / ${props.cols})` : "240px"};
        justify-content: space-between;
        padding: 10px;
        margin: 10px 0;
    }
    & > li a {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color: #666;
        width: 100%;
        cursor: pointer;
    }

    & > li a span {
        font-family: "Raleway";
        color: #333;
        text-align: center;
        font-weight: 400;
        font-size: ${props =>
        props.ratio ? `calc(15px * ${props.ratio})` : "15px"};
        text-decoration: none;
        margin: 10px 1px 0 0;
    }
    & > li a span:nth-child(1) {
        height: 25%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    & > li a span:nth-child(2) {
        font-weight: 600;
        text-transform: uppercase;
    }
`;

const ItemCollageComponent = ({ cols, items, height, ratio }) => {
    const [itemHeight, setPhotoHeight] = useState("");
    let itemCollage = React.createRef();

    // console.log(items, itemHeight, itemCollage, ratio);
    useEffect(() => {
        if (itemCollage) {
            setPhotoHeight(itemCollage.clientWidth);
        }
    }, [itemHeight]);

    if (!items) {
        return null;
    }

    return (
        <StyledItemCollage
            ref={ref => (itemCollage = ref)}
            height={itemHeight}
            cols={cols}
            ratio={ratio}
            height={height}
        >
            {!!items &&
                items.map((item, index) => (
                    <li key={index}>
                        <Link to={`/${item.to}`}>
                            <span>{item.svg}</span>
                            <span>{item.title}</span>
                            <span>{item.caption}</span>
                        </Link>
                    </li>
                ))}
        </StyledItemCollage>
    );
};

export default ItemCollageComponent;
