import React, { useEffect } from "react";
// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
// views
import { StyledUserLogin } from "./user-login";
import styled from "styled-components";

const StyledProductsizesForm = styled.span`
display: block;
padding: 0 20px;

& > div {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
    text-indent:0px;
    min-height: 43px;

    >  a {
        
        padding: 16px 7px;
        width: 100%;
        height: 100%;
        border-radius: 2px
        background: #f63366;
        color: ghostwhite !important;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
        color: #666;
        text-decoration: none;
    }
}

& > div input {
    width: 100%
    padding: 8px 3px;
}

& > div input:focus {
    outline: 0;
}



`;

// Add a new product
const ProductSizesNew = ({ productId }) => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit(
        `/api/products/${productId}/sizes`,
        fields,
        "/p#/merchant-account"
    );

    return (
        <StyledProductsizesForm>
            <div>
                Size:
                <input onChange={handleChange} name="size" placeholder="Size" />
            </div>
            <div>
                Length:
                <input
                    onChange={handleChange}
                    name="length"
                    placeholder="Length"
                />
            </div>

            <div>
                Bust:
                <input onChange={handleChange} name="bust" placeholder="Bust" />
            </div>
            <div>
                Hip:
                <input onChange={handleChange} name="hip" placeholder="Hip" />
            </div>
            <div>
                Inside leg:
                <input
                    onChange={handleChange}
                    name="insideLeg"
                    placeholder="Inside leg"
                />
            </div>
            <div>
                Shoulder:
                <input
                    onChange={handleChange}
                    name="shoulder"
                    placeholder="Shoulder"
                />
            </div>
            <div>
                Sleeve:
                <input
                    onChange={handleChange}
                    name="sleeve"
                    placeholder="Sleeve"
                />
            </div>
            <div>
                Waist:
                <input
                    onChange={handleChange}
                    name="waist"
                    placeholder="Waist"
                />
            </div>
            <div>
                <a onClick={submit}>submit</a>
            </div>
        </StyledProductsizesForm>
    );
};

export default ProductSizesNew;
