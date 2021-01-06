import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// models

import axios from "../../models/axios_csurf";
// Controllers
import {
    getProduct,
    getProductSizes,
    getUserSizes
} from "../../controllers/actions";
import styled from "styled-components";

// Views

import { camelObjToKebab } from "../../views/helpers";
import { PublicWrapper, OuterContent, InnerContent } from "../page/public-page";
import PaginationComponent from "../components/pagination-component";
import UserSizeForm from "../../views/forms/user-sizes-form";
import AddToCartButton from "../buttons/add-to-cart-button";
import PublicHeader from "../header/public-header";
import PublicFooter from "../footer/public-footer";

const StyledProductPage = styled.div`
    min-height: 150vh;

    & > ul {
        margin: 5px 0;
    }
`;

const Splitter = styled.div`
    display: flex;
    flex-direction: row;
`;

const ProductImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 65%;

    & > a {
        display: block;
        width: 75%;
        height: 100%;
    }

    & > a img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const ProductSideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 300px;
    width: 25%;
    border-left: 1px solid #dedede;
`;

const ProductSideBarInner = styled.div`
    width: 90%;
    min-height: 100%;

    & > span,
    > a,
    > select {
        width: 100%;
        text-transform: uppercase;
        display: block;
        margin-bottom: 20px;
    }

    & > span:nth-child(1) {
        color: #333;
        font-size: 24px;
        font-weight: 500;
        line-height: 36px;
    }
    & > span:nth-child(2) {
        color: #333;
        font-size: 18px;
        font-weight: 300;
        line-height: 24px;
        margin-bottom: 50px;
    }
    & > span:nth-child(3) {
        color: #bc1c11;
        font-size: 36px;
        font-weight: 500;
        line-height: 1em;
    }
    & > a {
        color: #666;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        width: 180px;
        display: block;
        cursor: pointer;
        text-decoration: none;
    }
    & > a:hover {
        color: #333;
    }

    & > select {
        width: 100%;
        padding: 16px 7px;
        border: 1px solid #ddd;
    }

    & > select:focus {
        outline: 0;
    }

    & > option {
        width: 100%;
        padding: 16px 7px;
        border: 1px solid #ddd;
    }
`;

const GetRecommendedSizeBtn = styled.span`
    padding: 16px 7px;
    border-radius: 2px;
    background: #f63366;
    color: ghostwhite;
    text-transform: uppercase;
    margin-bottom: 20px;
    cursor: pointer;
    text-align: center;
`;

const SizeResult = styled.span`
    border-radius: 2px;
    background: #f63366;
    color: ghostwhite;
    width: 50%;
    margin-bottom: 20px;
    text-align: center;
    align-self: center;
`;

const ProductDescriptionWrapper = styled.span`
    text-align: center;
    text-transform: lowercase;
    margin-bottom: 20px;
`;

const ProductPage = props => {
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const productSizes = useSelector(state => state.productSizes);
    const userSizes = useSelector(state => state.userSizes);
    const { id: productId } = props.match.params;
    const [selectedSize, setSelectedSize] = useState("0");
    const [recommendedSize, setRecommendedSize] = useState("");
    const handleSelectSize = e => {
        setSelectedSize(e.currentTarget.value);
    };
    const [isUserSizeFormVisible, setUserSizeFormVisible] = useState(false);
    const [submittedSizes, setSubmittedSizes] = useState({});
    useEffect(() => {
        // console.log("IN PRODUCT PAGE", productId);
        dispatch(getProduct(productId));
        dispatch(getProductSizes(productId));
        dispatch(getUserSizes());
    }, []);

    useEffect(() => {
        // console.log("IN PRODUCT PAGE", productId);

        console.log("getRecommendedSize CLICKED");
        console.log("BEGINNING", submittedSizes, productSizes);
        if (
            Object.entries(submittedSizes).length !== 0 &&
            productSizes &&
            productSizes.length !== 0
        ) {
            let userProductData = {};
            let kebabUserSizes = camelObjToKebab(submittedSizes);
            let kebabProductSizes = productSizes.map(obj =>
                camelObjToKebab(obj)
            );
            userProductData["user_sizes"] = kebabUserSizes;
            userProductData["product_sizes"] = kebabProductSizes;
            getRecommendedSize(userProductData);
        }
    }, [submittedSizes]);

    useEffect(() => {
        if (userSizes && Object.entries(userSizes).length !== 0) {
            // console.log("DB USERSIZES", userSizes);
            setSubmittedSizes(userSizes);
        }
    }, [userSizes]);

    const getRecommendedSize = async userProductData => {
        // console.log("USER PRODUCT DATA", userProductData);
        let { data } = await axios.post(
            `http://localhost:5000`,
            userProductData
        );
        //
        // console.log("DAASDASDASDASLDKLKJLKJ", data);
        if (data) {
            let lowest = 9999;
            let size = "";
            for (let key in data) {
                if (data[key] < lowest) {
                    lowest = data[key];
                    size = key;
                }
            }
            console.log("recommendedSize IS?", lowest, size);
            await setRecommendedSize(size);
        }
    };

    const toggleForm = () => {
        setUserSizeFormVisible(!isUserSizeFormVisible);
    };

    const handleUserSizeSubmit = submittedUserSizes => {
        setUserSizeFormVisible(false);
        setSubmittedSizes(submittedUserSizes);
    };

    console.log("USER SIZES", userSizes);

    if (!product || !productSizes) {
        return null;
    }

    console.log("IN PRODUCT PAGE AFTER", product, productSizes);
    const {
        productName,
        productCaption,
        productDescription,
        price,
        url
    } = product;
    return (
        <StyledProductPage>
            <PaginationComponent {...props} />
            <Splitter>
                <ProductImageWrapper>
                    <a>
                        <img
                            src={url || "/images/default.png"}
                            alt={productCaption}
                        />
                    </a>
                </ProductImageWrapper>
                <ProductSideBar>
                    <ProductSideBarInner>
                        <span>{productName}</span>
                        <span>{productCaption}</span>
                        <span>{price} EUR</span>
                        <span>
                            <a>Sizes</a>
                        </span>
                        <Link to={`/products/${product.id}/sizes`}>
                            See product sizes
                        </Link>
                        <GetRecommendedSizeBtn onClick={toggleForm}>
                            Get recommended size
                        </GetRecommendedSizeBtn>
                        {recommendedSize != "" && (
                            <React.Fragment>
                                <span>
                                    Based on your measurements, the recommended
                                    size is:
                                </span>
                                <SizeResult>{recommendedSize}</SizeResult>
                            </React.Fragment>
                        )}

                        {!!isUserSizeFormVisible && (
                            <UserSizeForm
                                callback={data => handleUserSizeSubmit(data)}
                            />
                        )}
                        <select onChange={handleSelectSize}>
                            {!!productSizes && (
                                <option value="0">Select your size</option>
                            )}
                            {!!productSizes &&
                                productSizes.map((sizes, index) => (
                                    <option value={index + 1} key={index}>
                                        {sizes.size}
                                    </option>
                                ))}
                        </select>
                        <span>
                            <AddToCartButton {...props} size={selectedSize} />
                        </span>
                        <span>
                            <h4>About the product</h4>
                        </span>
                        <ProductDescriptionWrapper>
                            {productDescription}
                        </ProductDescriptionWrapper>
                    </ProductSideBarInner>
                </ProductSideBar>
            </Splitter>
        </StyledProductPage>
    );
};

export default ProductPage;
