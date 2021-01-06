import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Views
import styled from "styled-components";

// Style
const COLS = 3;
const PageItem = styled.div`
    background: ghostwhite;
    padding: 5px;
    & > *{
        max-width 100%;
    }
`;

const StyledPhotoCollage = styled(PageItem)`
    display: grid;
    grid-template-columns: ${props =>
        props.cols
            ? `repeat(${props.cols}, calc(100% / ${props.cols} - 5px))`
            : `repeat(${COLS}, calc(100% / ${COLS} - 5px))`};
    grid-template-rows: auto;
    justify-content: space-evenly;
    grid-gap: 5px;

    & > a {
        position: relative;
        display: block;
        cursor: pointer;
        width: calc(100%);
    }

    & > a img {
        width: 100%;
        height: ${props =>
        props.height
            ? `${(props.height / props.cols) * props.ratio}px`
            : `${100 / COLS}%`};
        object-fit: cover;
    }
    & > a span {
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        color: ghostwhite;
        font-weight: 400;
        font-size: 28px;
        line-height: 30px;
        text-align: center;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        text-decoration: none;
    }
`;

const PhotoCollageComponent = ({ photos, cols, ratio }) => {
    const [photoHeight, setPhotoHeight] = useState("");
    let photoCollage = React.createRef();

    useEffect(() => {
        if (photoCollage) {
            setPhotoHeight(photoCollage.clientWidth);
        }
    }, [photoHeight]);

    if (!photos) {
        return null;
    }

    return (
        <StyledPhotoCollage
            ref={ref => (photoCollage = ref)}
            height={photoHeight}
            cols={cols}
            ratio={ratio}
        >
            {!!photos &&
                photos.map((photo, index) => (
                    <Link to={`/${photo.to}`} key={index}>
                        <img src={photo.url} />
                        <span>{photo.caption}</span>
                    </Link>
                ))}
        </StyledPhotoCollage>
    );
};

export default PhotoCollageComponent;
