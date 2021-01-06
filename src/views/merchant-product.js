import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Controllers
import { getMerchantProduct } from "../controllers/actions";

// Show merchant product page
const MerchantProduct = props => {
    const dispatch = useDispatch();
    const { id: productId } = props.match.params;
    const merchantProduct = useSelector(state => state.merchantProduct);

    useEffect(() => {
        dispatch(getMerchantProduct(productId));
    }, []);

    if (!merchantProduct) {
        return null;
    }

    const {
        id,
        productName,
        productSlug,
        productCaption,
        productDescription,
        price,
        productStatus,
        url,
        createdAt
    } = merchantProduct;

    return (
        <React.Fragment>
            <div>
                <div>Merchant Product: {productId}</div>
                <div>ID: {id}</div>
                <div>{productName}</div>
                <div>{productSlug}</div>
                <div>{productCaption}</div>
                <div>{productDescription}</div>
                <div>{price}</div>
                <div>{productStatus}</div>
                <div>{createdAt}</div>
                <div>{url}</div>
            </div>
        </React.Fragment>
    );
};

export default MerchantProduct;
