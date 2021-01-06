// CONTROLLER
import { useSelector } from "react-redux";

import { useFetchData } from "../views/helpers";
import axios from "../models/axios_csurf";

// User
export const getUser = async userId => {
    let user = await useFetchData(`/api/users/${userId}`);
    // console.log("IN ACTION", user);
    return {
        type: "GET_USER",
        data: user[0] || {}
    };
};
// User Profile
export const getUserProfile = async userId => {
    let userProfile = await useFetchData(`/api/user-profiles/${userId}`);
    return {
        type: "GET_USER_PROFILE",
        data: userProfile[0] || {}
    };
};

// getUserSizes
export const getUserSizes = async () => {
    let userSizes = await useFetchData(`/api/user-sizes/`);
    console.log("IN ACTION AFTER DB", userSizes);
    return {
        type: "GET_USER_SIZES",
        data: userSizes[0] || {}
    };
};
// User Address
export const getUserAddress = async userId => {
    let userAddress = await useFetchData(`/api/user-addresses/${userId}`);
    return {
        type: "GET_USER_ADDRESS",
        data: userAddress[0] || {}
    };
};

// Merchant
export const getMerchant = async merchantId => {
    let merchant = await useFetchData(`/api/merchants`);
    return {
        type: "GET_MERCHANT",
        data: merchant[0] || {}
    };
};

// Merchant products
export const getMerchantProducts = async merchantId => {
    // console.log("IN ACTION BEFORE", merchantId);
    let merchantProducts = await useFetchData(
        `/api/merchants/${merchantId}/products`
    );
    // console.log("IN ACTION AFTER", merchantProducts);
    return {
        type: "GET_MERCHANT_PRODUCTS",
        data: merchantProducts || []
    };
};

export const getMerchantProduct = async productId => {
    // console.log("IN ACTION BEFORE", productId);
    let merchantProduct = await useFetchData(
        `/api/merchants/merchantId/products/${productId}`
    );
    // console.log("IN ACTION AFTER", merchantProduct);
    return {
        type: "GET_MERCHANT_PRODUCT",
        data: merchantProduct[0] || {}
    };
};

export const getCategories = async () => {
    // console.log("IN ACTION BEFORE GET CATEGORIES");
    let categories = await useFetchData(`/api/categories/`);
    // console.log("IN ACTION AFTER", categories);
    return {
        type: "GET_CATEGORIES",
        data: categories || []
    };
};

export const getCategory = async categoryId => {
    // console.log("IN ACTION BEFORE GET CATEGORIES");
    let category = await useFetchData(`/api/categories/${categoryId}`);
    // console.log("IN ACTION AFTER", category);
    return {
        type: "GET_CATEGORY",
        data: category[0] || {}
    };
};

export const getProducts = async () => {
    console.log("IN ACTION BEFORE GET PRODUCTS ");
    let products = await useFetchData(`/api/products`);
    console.log("IN ACTION AFTER", getProducts);
    return {
        type: "GET_PRODUCTS",
        data: products || []
    };
};
export const getProductsByCategories = async categoryIds => {
    // console.log("IN ACTION BEFORE GET PRODUCTS BY CATEGORIES", categoryId);
    let productsByCategories;
    if (categoryIds && categoryIds.length != 0) {
        productsByCategories = await useFetchData(
            `/api/categories/many/products`,
            { categoryIds }
        );
    } else {
        productsByCategories = await useFetchData(`/api/products/`);
    }
    console.log(
        "IN ACTION getProductsByCategories AFTER",
        productsByCategories
    );
    return {
        type: "GET_PRODUCTS_BY_CATEGORIES",
        data: productsByCategories || []
    };
};
export const getProductsByCategory = async categoryId => {
    // console.log("IN ACTION BEFORE GET PRODUCTS BY CATEGORIES", categoryId);
    let productsByCategory = await useFetchData(
        `/api/categories/${categoryId}/products`
    );
    // console.log("IN ACTION AFTER", productsByCategory);
    return {
        type: "GET_PRODUCTS_BY_CATEGORY",
        data: productsByCategory || []
    };
};

export const getProduct = async productId => {
    // console.log("IN ACTION BEFORE GET PRODUCT", productId);
    let product = await useFetchData(`/api/products/${productId}`);
    // console.log("IN ACTION AFTER GET PRODUCT", product);
    return {
        type: "GET_PRODUCT",
        data: product[0] || {}
    };
};
export const getProductSizes = async productId => {
    // console.log("IN ACTION BEFORE GET PRODUCT SIZES", productId);
    let productSizes = await useFetchData(`/api/products/${productId}/sizes`);
    // console.log("IN ACTION AFTER GET PRODUCT SIZES", productSizes);
    if (productSizes.name == "error") {
        productSizes = [];
    }
    return {
        type: "GET_PRODUCT_SIZES",
        data: productSizes || []
    };
};

// Cart
export const getCartItems = async () => {
    // console.log("IN ACTION BEFORE GET CART ITEMS");
    let cartItems = await useFetchData(`/api/cart-items`);
    // console.log("IN ACTION AFTER GET CART", cartItems);
    return {
        type: "GET_CART_ITEMS",
        data: cartItems || []
    };
};

export const addCartItem = async item => {
    // console.log("IN ACTION BEFORE ADD CART ITEM", item);
    return {
        type: "ADD_CART_ITEMS",
        data: items => [...items, item]
    };
};
export const deleteCartItem = async itemId => {
    // console.log("IN ACTION BEFORE ADD CART ITEM", item);
    return {
        type: "DELETE_CART_ITEMS",
        data: items => items.filter(item => item.id != itemId && item)
    };
};
