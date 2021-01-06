import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Controllers
import { getMerchantProducts } from "../controllers/actions";
// Views
import ProductNew from "./forms/product-new";

// Show merchant products page
const MerchantProducts = ({ merchantId }) => {
    const dispatch = useDispatch();
    const merchantProducts = useSelector(state => state.merchantProducts);

    useEffect(() => {
        console.log(merchantId);
        dispatch(getMerchantProducts(merchantId));
    }, []);

    if (!merchantProducts) {
        return null;
    }
    console.log("IN MERCHANT PRODUCTS", merchantProducts);

    return (
        <React.Fragment>
            <div>
                <div>Merchant Account: {merchantId}</div>
                <ProductNew />
                {!!merchantProducts &&
                    merchantProducts.map(product => (
                        <div key={`p-${product.id}-${product.productSlug}`}>
                            <p>
                                `p-{product.id}-{product.productSlug}`
                            </p>
                            <div>ID: {product.id}</div>
                            <div>{product.productName}</div>
                            <div>{product.productSlug}</div>
                            <div>{product.productCaption}</div>
                            <div>{product.productDescription}</div>
                            <div>{product.price}</div>
                            <div>{product.productStatus}</div>
                            <div>{product.createdAt}</div>
                            <div>{product.url}</div>
                        </div>
                    ))}
            </div>
        </React.Fragment>
    );
};

export default MerchantProducts;
