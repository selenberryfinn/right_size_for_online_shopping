import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Views
import styled from "styled-components";

// Style

const StyledFooterItems = styled.ul`
    list-style-type: none;
    width: ${props => (props.cols ? `calc(1200px / ${props.cols})` : "240px")};
    background: transparent;
    display: flex;
    flex-direction: column;
    padding: 10px 0;

    & > li {
        display: inline-flex;
        width: 100%;
        justify-content: space-between;
        padding: 5px;
    }

    & > li a {
        display: inline-flex;
        flex-direction: column;
        justify-content: flex-start;
        color: ghostwhite;
        width: 100%;
        cursor: pointer;
        padding: 0 5px;
    }

    & > li a span {
        font-family: "Raleway";
        color: #fefefe;
        padding: 5px;
        text-align: left;
        font-weight: 400;
        font-size: 12px;
        text-decoration: none;
        line-height: 14px;
    }
`;

const Title = styled.li`
    & > a span {
        text-transform: uppercase;
        font-weight: 600 !important;
        font-size: 16px !important;
        letter-spacing: 0.1em;
    }
`;

const FooterItemComponent = ({ cols, items, title }) => {
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
        <StyledFooterItems
            ref={ref => (itemCollage = ref)}
            height={itemHeight}
            cols={cols}
        >
            {!!title && (
                <Title>
                    <a>
                        <span>{title}</span>
                    </a>
                </Title>
            )}
            {!!items &&
                items.map(item => (
                    <li key={`${item.id}-${item.categorySlug}`}>
                        <Link to={`/${item.to}`}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
        </StyledFooterItems>
    );
};

export default FooterItemComponent;
