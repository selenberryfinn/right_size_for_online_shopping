import React, { useEffect, useState } from "react";
import { useAuthSubmit } from "../../controllers/hooks";

// views
// Views
import styled from "styled-components";

const StyledPhotoNew = styled.span`

max-width: 100vw;
display: flex;
flex-direction: column;

justify-content: center;
align-items: center;
padding: 20px;

& > div {
    margin-bottom: 10px;
    width: 100%;
    display: inline-block;
    text-align:center;
    max-width: 500px;
}

& > div input, div select {
    width: 100%
    height: 100%;
    padding: 16px 7px;


}

& > div input:focus {
    outline: 0;
}

& > a {
    padding: 16px 7px;
    min-width: 500px;
    border-radius: 2px
    background: #f63366;
    color: ghostwhite;
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 20px;
    cursor: pointer;
}

& > div a {
    color: #666;
    text-decoration: none;
}
`;

const PhotoNew = ({ productId }) => {
    const [formData, setFormData] = useState();
    const [error, submit] = useAuthSubmit(
        `/api/products/${productId}/photos`,
        formData
    );

    const handleChange = () => {
        let photo = event.target.files[0];
        const fd = new FormData();
        fd.append("photo", photo);
        setFormData(fd);
    };

    return (
        <StyledPhotoNew>
            <input type="file" accept="image/*" onChange={handleChange} />
            <a onClick={submit}>submit</a>
        </StyledPhotoNew>
    );
};

export default PhotoNew;
