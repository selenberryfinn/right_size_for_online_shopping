import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Views
import styled from "styled-components";
import { Outer, Inner } from "../style/global";
// Style

const InnerNav = styled(Inner)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 12px;
`;

const StyledNav = styled.ul`
    list-style-type: none;
    width: ${props => (props.width ? `${props.width}` : "100%")};
    font-family: "Work Sans";
    & > li {
        display: inline-flex;
        width: ${props => (props.cols ? `calc(100% / ${props.cols})` : "auto")};
        justify-content: space-between;
        align-items: center;
    }

    & > li a {
        height: 40px;
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        color: ghostwhite;
        cursor: pointer;
        padding: 10px 5px 0 0;
    }

    & > li a span {
        width: 100%;
        padding: 0 3px;
        font-family: "Raleway", "Work Sans", "Arial";
        text-align: center;
        font-weight: 400;
        font-size: 12px;
        text-decoration: none;
        text-transform: uppercase;
        white-space: nowrap;
    }

    & > li span:hover {
        border-bottom: 2px solid ghostwhite;
        box-sizing: border-box;
    }
`;

const NavComponent = ({ cols, width, items }) => {
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
        <InnerNav>
            <StyledNav
                ref={ref => (itemCollage = ref)}
                height={itemHeight}
                cols={cols}
                width={width}
            >
                {!!items &&
                    items.map((item, index) => (
                        <li key={index}>
                            <Link to={`/categories/${item.id}`}>
                                <span>{item.categoryName}</span>
                            </Link>
                        </li>
                    ))}
            </StyledNav>
        </InnerNav>
    );
};

export default NavComponent;
