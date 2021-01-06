import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// Controllers
import {
    getUser,
    getUserProfile,
    getUserAddress,
    getUserSizes
} from "../../controllers/actions";

// Views
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

export const StyledBoxes = styled.div`
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
        line-height: 45px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        text-indent: 20px;
    }
    & > span {
        display: block;

        font-size: 12px;

        text-indent: 20px;
    }
`;

const UserAccount = ({ userId }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const userProfile = useSelector(state => state.userProfile);
    const userAddress = useSelector(state => state.userAddress);
    const userSizes = useSelector(state => state.userSizes);

    useEffect(() => {
        dispatch(getUser(userId));
        dispatch(getUserProfile(userId));
        dispatch(getUserAddress(userId));
        dispatch(getUserSizes(userId));
    }, []);
    if (!user || !userProfile || !userAddress || !userSizes) {
        return null;
    }
    console.log("IN USER ACCOUNT", userSizes);
    const { first, last, email } = user;
    const { birthdayDay, birthdayMonth, birthdayYear, gender } = userProfile;
    const { address, postal, city } = userAddress;
    const { bust, hip, insideLeg, shoulder, sleeve, waist } = userSizes;

    return (
        <AccountWrapper>
            <Title>Welcome {first}</Title>
            <Caption>
                Here you can change your information, view your orders or your
                favorites
            </Caption>
            <FormWrapper>
                <StyledBoxes width="95%">
                    <div>Your details</div>
                    <span>First name:{first}</span>
                    <span>Surname:{last}</span>
                    <span>
                        Birthday:{birthdayDay}/{birthdayMonth}/{birthdayYear}
                    </span>
                    <span>Gender:{gender}</span>
                    <span>Email:{email}</span>
                    <span>Change information</span>
                </StyledBoxes>
                <StyledBoxes width="95%">
                    <div>Billing and delivery information</div>
                    <span>Address: {address}</span>
                    <span>Postal code: {postal}</span>
                    <span>City: {city}</span>
                </StyledBoxes>
                <StyledBoxes width="95%">
                    <div>Your sizes</div>
                    <span>Bust: {bust}</span>
                    <span>Hip: {hip}</span>
                    <span>Inside leg. {insideLeg}</span>
                    <span>Shoulder: {shoulder}</span>
                    <span>Sleeve: {sleeve}</span>
                    <span>Waist: {waist}</span>
                </StyledBoxes>
                <StyledBoxes width="95%">
                    <div>Your orders</div>
                    <span>Date: Status: Items:</span>
                </StyledBoxes>
            </FormWrapper>
        </AccountWrapper>
    );
};

export default UserAccount;
