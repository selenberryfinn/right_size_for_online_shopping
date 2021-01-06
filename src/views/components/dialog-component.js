import React, { useState, useEffect } from "react";

// Views
import styled from "styled-components";

// Style

const StyledDialogComponent = styled.div`
    position: absolute;
    width: 50%;
    height: 95vh;
    top: 2.5vh;
    left: 50%;
    transform: translateX(-75%);
    list-style-type: none;
    background: ghostwhite;
    border-radius: 3px;
    border: 1px solid #ddd;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 3;

    &:before {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 3;
    }

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

const DialogComponent = ({ cols, items, height, ratio }) => {
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
        <StyledDialogComponent
            ref={ref => (itemCollage = ref)}
            cols={cols}
            ratio={ratio}
            height={height}
        >
            <ul>
                {!!items &&
                    items.map(item => (
                        <li key={`${item.id}-${item.size}`}>
                            <a>
                                <span>{item.size}</span>
                                <span>{item.shoulder}</span>
                                <span>{item.caption}</span>
                            </a>
                        </li>
                    ))}
            </ul>
        </StyledDialogComponent>
    );
};

export default DialogComponent;
