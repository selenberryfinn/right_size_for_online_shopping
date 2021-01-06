import React from "react";
import { useAuthSubmit } from "../../controllers/hooks";

const ProductDelete = ({ productId }) => {
    const [error, submit] = useAuthSubmit(`/api/products/${productId}/delete`);
    return (
        <React.Fragment>
            <a onClick={submit}>Delete</a>
        </React.Fragment>
    );
};

export default ProductDelete;
