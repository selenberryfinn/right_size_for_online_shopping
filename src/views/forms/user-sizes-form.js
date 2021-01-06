import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
// Views

export const StyledUserLogin = styled.div`
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    padding: 5px;

    & > div {
        margin-bottom: 2px;
        width: 100%;
        display: inline-block;
        text-align:center;

    }

    & > div input, div select {
        width: 100%
        height: 100%;
        padding: 5px 2px;


    }

    & > div input:focus {
        outline: 0;
    }

    & > a {
        padding: 7px 3px;
        font-size: 12px;
        width: 100%;
        border-radius: 2px
        background: #333;
        color: ghostwhite;
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 5px;
        cursor: pointer;
    }

    & > div a {
        color: #666;
        text-decoration: none;
    }
`;

const UserSizeForm = ({ callback }) => {
    const [fields, handleChange] = useStatefulFields();

    const onSubmit = () => {
        // console.log("ON SUBMIT IN UserSizesLoggedOut", fields);
        callback(fields);
    };

    return (
        <StyledUserLogin>
            <div>
                <input
                    onChange={handleChange}
                    name="bust"
                    type="number"
                    placeholder="Bust"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="shoulder"
                    type="number"
                    placeholder="Shoulder"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="sleeve"
                    type="number"
                    placeholder="Sleeve "
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="waist"
                    type="number"
                    placeholder="Waist"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="hip"
                    type="number"
                    placeholder="Hip"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="insideLeg"
                    type="number"
                    placeholder="Inside leg"
                />
            </div>
            <a onClick={onSubmit}>submit</a>
        </StyledUserLogin>
    );
};

export default UserSizeForm;
