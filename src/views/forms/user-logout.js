import React from "react";
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
import { Link } from "react-router-dom";

const UserLogout = () => {
    const [error, submit] = useAuthSubmit("/api/users/logout");
    return (
        <React.Fragment>
            <a onClick={submit}>Logout</a>
        </React.Fragment>
    );
};

export default UserLogout;
