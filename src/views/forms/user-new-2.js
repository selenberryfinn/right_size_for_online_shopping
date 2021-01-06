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

const UserNew2 = () => {
    const [fields, handleChange] = useStatefulFields();
    console.log(fields);
    const [error, submit] = useAuthSubmit(
        "/api/user-profiles",
        fields,
        "/p#/user-new-3"
    );
    return (
        <StyledUserLogin>
            <div>
                <select onChange={handleChange} name="birthdayDay">
                    {<option value="0">Day</option>}
                    {optionsDay()}
                </select>
            </div>
            <div>
                <select onChange={handleChange} name="birthdayMonth">
                    {<option value="0">Month</option>}
                    {optionsMonth()}
                </select>
            </div>
            <div>
                <select onChange={handleChange} name="birthdayYear">
                    {<option value="0">Year</option>}
                    {optionsYear()}
                </select>
            </div>
            <div>
                <select onChange={handleChange} name="gender">
                    {optionsGender()}
                </select>
            </div>
            <a onClick={submit}>submit</a>
        </StyledUserLogin>
    );
};

export default UserNew2;
