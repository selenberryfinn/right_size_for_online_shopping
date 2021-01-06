import React from "react";
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
import { Link } from "react-router-dom";
import { StyledUserLogin } from "./user-login";

// Register new user - part 1
const UserNew = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit(
        "/api/users",
        fields,
        "/p#/user-new-2"
    );
    return (
        <StyledUserLogin>
            <div>
                <input
                    onChange={handleChange}
                    name="first"
                    placeholder="First name"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="last"
                    placeholder="Surname"
                />
            </div>
            <div>
                {!!error && error == "email" && (
                    <div>Sorry, that email is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="email"
                    placeholder="Email"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="password"
                    placeholder="New password"
                    type="password"
                />
            </div>
            <a onClick={submit}>submit</a>
            <div>
                Already registered? <Link to="/login">Click here to login</Link>
            </div>
        </StyledUserLogin>
    );
};

export default UserNew;
