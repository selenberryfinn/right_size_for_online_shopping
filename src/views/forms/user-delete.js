import React from "react";
import { useAuthSubmit } from "../../controllers/hooks";

const UserDelete = () => {
    const [error, submit] = useAuthSubmit(`/api/users/delete`);
    return (
        <React.Fragment>
            <a onClick={submit}>Delete</a>
        </React.Fragment>
    );
};

export default UserDelete;
