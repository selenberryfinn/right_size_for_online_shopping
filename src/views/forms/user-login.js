import React from "react";
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
import { Link } from "react-router-dom";

import styled from "styled-components";

export const StyledUserLogin = styled.div`

    min-height: 75vh;
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

const UserLogin = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/users/login", fields);
    return (
        <StyledUserLogin>
            <div>
                {!!error && error == "email" && (
                    <div>Sorry, incorrect email</div>
                )}
                <input
                    onChange={handleChange}
                    name="email"
                    placeholder="Email"
                />
                {!!error && error == "password" && (
                    <div>Sorry, incorrect password</div>
                )}
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="password"
                    placeholder="Password"
                    type="password"
                />
            </div>
            <a onClick={submit}>submit</a>
            <div>
                Not yet registered?{" "}
                <Link to="/user-new">Click here to register</Link>
            </div>
        </StyledUserLogin>
    );
};

export default UserLogin;
