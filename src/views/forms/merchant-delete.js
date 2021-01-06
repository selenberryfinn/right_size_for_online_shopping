import React from "react";
import { useAuthSubmit } from "../../controllers/hooks";

const MerchantDelete = ({ merchantId }) => {
    const [error, submit] = useAuthSubmit(
        `/api/merchants/${merchantId}/delete`
    );
    return (
        <React.Fragment>
            <a onClick={submit}>Delete</a>
        </React.Fragment>
    );
};

export default MerchantDelete;
