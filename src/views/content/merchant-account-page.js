import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// Controllers

import {
    getMerchant,
    getUserProfile,
    getUserAddress,
    getUserSizes,
    getMerchantProducts
} from "../../controllers/actions";

// Views
import MerchantNew from "../forms/merchant-new";
import { StyledUserLogin } from "../forms/user-login";
import { Edit2, Plus } from "../style/icons";

// Style
const AccountWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    min-height: 75vh;
    width: 100%;
    align-items: center;
    padding: 0 50px 50px;
`;
const Title = styled.div`
    font-family: "PT+Serif", sans-serif;
    font-size: 20px;
    text-transform: uppercase;
    padding: 30px 0 0 0;
    width: 100%;
    text-align: center;
`;
const Caption = styled.div`
    width: 100%;
    text-align: center;
    color: #666;
    font-size: 12px;
    padding: 10px 0 0 0;

    -webkit-box-shadow: 0px 1px 1px -2px #ddd, 0px 2px 2px -1px #dedede,
        0px 4px 4px -2px #eee;
    -moz-box-shadow: 0px 1px 1px -2px #ddd, 0px 2px 2px -1px #dedede,
        0px 4px 4px -2px #eee;
    box-shadow: 0px 1px 1px -2px #ddd, 0px 2px 2px -1px #dedede,
        0px 4px 4px -2px #eee;
`;

const FormWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 50%);
    width: 100%;
`;

const StyledBoxes = styled.div`
    display: flex;
    width: ${props => (props.width ? props.width : "100%")};
    flex-direction: column;
    border: 1px solid #ddd;
    float: left;
    min-height: 175px;
    border: 1px solid #c7c7c7;
    margin: 20px 20px 0 0;

    & > div {
        background: #f3f3f3;
        height: 45px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
    }

    & > span,
    > a {
        display: block;
        font-size: 12px;
        padding: 0 10px;
        display: flex;
        border: 1px solid #eee;
        height: 25px;

        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        & > span img {
            height: 25px;
            width: 25px;
            object-fit: cover;
            margin-right: 4px;
        }
    }
`;

const MerchantAccount = ({ merchantId }) => {
    const dispatch = useDispatch();
    const merchant = useSelector(state => state.merchant);
    const userProfile = useSelector(state => state.userProfile);
    const userAddress = useSelector(state => state.userAddress);
    const userSizes = useSelector(state => state.userSizes);
    const merchantProducts = useSelector(state => state.merchantProducts);

    useEffect(() => {
        dispatch(getMerchant(merchantId));
        dispatch(getUserProfile(merchantId));
        dispatch(getUserAddress(merchantId));
        dispatch(getUserSizes(merchantId));
        dispatch(getMerchantProducts());
    }, []);
    if (!merchant || !userProfile || !userAddress || !userSizes) {
        return null;
    }
    console.log("IN MERCHANT ACCOUNT", merchantProducts);
    const { merchantName } = merchant;
    const { birthdayDay, birthdayMonth, birthdayYear, gender } = userProfile;
    const { address, postal, city } = userAddress;
    const { bust, hip, insideLeg, shoulder, sleeve, waist } = userSizes;

    console.log("merchant IS??", merchant);

    return Object.entries(merchant).length === 0 &&
        merchant.constructor === Object ? (
            <StyledUserLogin>
                <MerchantNew />
            </StyledUserLogin>
        ) : (
            <AccountWrapper>
                <Title>Welcome {merchantName}</Title>
                <Caption>
                Here you can change your information, view your orders or your
                favorites
                </Caption>
                <FormWrapper>
                    <StyledBoxes width="95%">
                        <div>Your details</div>

                        <span>Change information</span>
                    </StyledBoxes>
                    <StyledBoxes width="95%">
                        <div>
                            <span>Billing and delivery information</span>
                            <Link to="/user-new-3">
                                <Edit2 />
                            </Link>
                        </div>
                        <span>Address: {address}</span>
                        <span>Postal code: {postal}</span>
                        <span>City: {city}</span>
                    </StyledBoxes>

                    <StyledBoxes width="95%">
                        <div>Your orders</div>
                        <span>Date: Status: Items:</span>
                    </StyledBoxes>

                    <StyledBoxes width="95%">
                        <div>
                        Your products{" "}
                            <Link to="/product-new">
                                <Plus />
                            </Link>
                        </div>
                        {!!merchantProducts &&
                        merchantProducts.map((product, index) => (
                            <Link
                                key={index}
                                to={`/product-edit/${product.id}`}
                            >
                                <span>
                                    <img
                                        src={
                                            product.url || "/images/default.png"
                                        }
                                    />
                                    {product.productName}
                                    {product.caption}
                                </span>
                            </Link>
                        ))}
                    </StyledBoxes>
                </FormWrapper>
            </AccountWrapper>
        );
};

export default MerchantAccount;
