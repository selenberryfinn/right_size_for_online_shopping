import React, { useState, useEffect } from "react";

// Views
import styled from "styled-components";

// Style

const StyledItemCollage = styled.ul`
    list-style-type: none;
    text-align: center;
    width: 100%;
    background: ghostwhite;
    height: 75px;
    display: inline-flex;
    justify-content: center;
    padding: 10px 0;

    & > li {
        display: inline-flex;
        width: ${props =>
        props.cols ? `calc(1200px / ${props.cols})` : "240px"};
        justify-content: space-between;
        align-items: center;
        padding: 5px;
    }

    & > li a {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color: #666;
        width: 100%;
        cursor: pointer;
        margin: 10px 0;
        padding: 0 5px;
    }

    & > li a span {
        font-family: "Raleway";
        color: #444;
        padding: 15px;
        text-align: center;
        font-weight: 400;
        font-size: 18px;
        text-decoration: none;
        text-transform: uppercase;
        line-height: 20px;
    }
`;

const CategoriesCollageComponent = ({ cols, items }) => {
    const [itemHeight, setPhotoHeight] = useState("");
    let itemCollage = React.createRef();

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
        >
            {!!items &&
                items.map(item => (
                    <li key={`${item.id}-${item.categorySlug}`}>
                        <a>
                            <span>{item.categoryName}</span>
                        </a>
                    </li>
                ))}
        </StyledItemCollage>
    );
};

export default CategoriesCollageComponent;
