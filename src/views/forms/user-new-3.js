import React from "react";
import { Link } from "react-router-dom";
// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
// Views

import { StyledUserLogin } from "./user-login";
import {
    optionsDay,
    optionsMonth,
    optionsYear,
    optionsGender
} from "../helpers";

const UserNew3 = () => {
    const [fields, handleChange] = useStatefulFields();
    console.log(fields);
    const [error, submit] = useAuthSubmit(
        "/api/user-addresses",
        fields,
        "/p#/user-new-4"
    );
    return (
        <StyledUserLogin>
            <div>
                <input
                    onChange={handleChange}
                    name="address"
                    placeholder="Street and housenumber"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="postal"
                    placeholder="Postal code"
                />
            </div>{" "}
            <div>
                <input onChange={handleChange} name="city" placeholder="City" />
            </div>
            <a onClick={submit}>submit</a>
        </StyledUserLogin>
    );
};

export default UserNew3;
