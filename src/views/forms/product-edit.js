import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Controllers
import { getProduct, getProductSizes } from "../../controllers/actions";
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";

// Views
import { StyledUserLogin } from "./user-login";
import { optionsProductState } from "../helpers";
import PhotoNew from "./photo-new";
import ProductSizesNew from "./product-sizes-new";
import { StyledBoxes } from "../content/user-account-page";
import styled from "styled-components";

const StyledBoxes2 = styled(StyledBoxes)`
    float: left;
    min-height: 375px;
    & > ul {
        list-style-type: none;
        padding-left: 10px;
        font-size: 11px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: flex-end;
        & > li {
            width: calc(100% / 8);
            padding: 3px 0;
        }
    }

    & >  input, textarea, select {
        width: 100%
        padding: 8px 3px;
        height: 100
        color: #666;
        font-family: Verdana,Arial;
        font-weight: normal;
        font-style: normal;
        line-height: 20px;
    }

    & >  input:focus {
        outline: 0;
    }

    & >  a {
        padding: 16px 7px;
        width: 100%;
        background: #f63366;
        height: 100%;
        font-size: 12px;
        border-radius: 2px;
        color: ghostwhite !important;
        text-align: center;
        text-transform: uppercase;
        cursor: pointer;
        color: #666;
        -webkit-text-decoration: none;
        text-decoration: none;
    }
    & > img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

`;

// Edit a product
const ProductEdit = props => {
    console.log("WHAT ABOUT PROPR?", props);
    const { id } = props.match.params;
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit(
        "/api/products",
        fields,
        "/p#/merchant-account"
    );
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const productSizes = useSelector(state => state.productSizes);

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getProductSizes(id));
    }, []);

    useEffect(() => {
        const { productName } = fields;
        let slug;
        if (productName) {
            slug = productName
                .trim()
                .replace(/[^\w\s]/gi, "")
                .toLowerCase()
                .split(" ")
                .join("-");
        }
        fields["productSlug"] = slug;
    }, [fields]);

    console.log("IN PRODUCT EDIT", product);

    if (!product) {
        return null;
    }

    let {
        productName,
        productCaption,
        productDescription,
        price,
        url
    } = product;
    return (
        <React.Fragment>
            <StyledBoxes2 width="48%">
                <div>Product photo</div>
                <img src={url} />
                <div>Add a new photo</div>
                <PhotoNew {...props} productId={id} />
            </StyledBoxes2>
            <StyledBoxes2 width="48%">
                <div>Change product details</div>

                {!!error && error == "product_name" && (
                    <div>Sorry, that name is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="productName"
                    placeholder="Product name"
                    defaultValue={productName}
                />

                <input
                    onChange={handleChange}
                    name="productCaption"
                    placeholder="Caption"
                    defaultValue={productCaption}
                />

                <textarea
                    onChange={handleChange}
                    name="productDescription"
                    placeholder="Description"
                >
                    {productDescription}
                </textarea>

                <input
                    onChange={handleChange}
                    name="price"
                    placeholder="Price"
                    defaultValue={price}
                />

                <select onChange={handleChange} name="status">
                    {optionsProductState(status)}
                </select>

                <a onClick={submit}>submit</a>
            </StyledBoxes2>
            <StyledBoxes2 width="48%">
                <div>Product Sizes</div>
                {!!productSizes && (
                    <ul>
                        <li>Size</li>
                        <li>Length</li>
                        <li>Bust</li>
                        <li>Hip</li>
                        <li>Inside Leg</li>
                        <li>Shoulder</li>
                        <li>Sleeve</li>
                        <li>Waist</li>
                    </ul>
                )}
                {!!productSizes &&
                    productSizes.map((sizes, index) => (
                        <ul key={index}>
                            <li>{sizes.size}</li>
                            <li value={index + 1} key={index}>
                                {sizes.length}
                            </li>
                            <li value={index + 1} key={index}>
                                {sizes.bust}
                            </li>
                            <li value={index + 1} key={index}>
                                {sizes.hip}
                            </li>
                            <li value={index + 1} key={index}>
                                {sizes.insideLeg}
                            </li>
                            <li value={index + 1} key={index}>
                                {sizes.shoulder}
                            </li>
                            <li value={index + 1} key={index}>
                                {sizes.sleeve}
                            </li>
                            <li value={index + 1} key={index}>
                                {sizes.waist}
                            </li>
                        </ul>
                    ))}

                <div>Add product sizes</div>
                <ProductSizesNew {...props} productId={id} />
            </StyledBoxes2>

            <StyledUserLogin></StyledUserLogin>
        </React.Fragment>
    );
};

export default ProductEdit;
