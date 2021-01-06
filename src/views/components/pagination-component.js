import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Views
import styled from "styled-components";

import { ChevronRight } from "../style/icons";
const StyledPagination = styled.ul`
    width: 100%;
    height: 33px;
    padding: 5px 0;

    & > a {
        text-transform: uppercase;
        display: inline-block;
        cursor: pointer;
        height: 100%;
        text-decoration: none;
        color: #666;
        font-size: 12px;
    }
    & > a span {
        padding: 7px 3px;
    }
`;

const PaginationComponent = props => {
    const [pag, setPag] = useState([]);
    console.log(props);
    const getPath = index => {
        let path = pag.slice(0, index + 1).join("/");
        return path;
    };
    useEffect(() => {
        setPag(props.match.url.split("/"));
    }, []);

    if (!props) {
        return null;
    }

    return (
        <StyledPagination>
            {!!pag && (
                <Link to="/">
                    <span>Home</span>
                </Link>
            )}
            {!!pag &&
                pag.map((sizes, index) => (
                    <React.Fragment key={index}>
                        <a href={getPath(index)}>
                            <span>{pag[index]}</span>
                        </a>
                        <ChevronRight height="12" color="#666" />
                    </React.Fragment>
                ))}
        </StyledPagination>
    );
};

export default PaginationComponent;
