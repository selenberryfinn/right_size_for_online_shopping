import React, { useEffect } from "react";
// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
// views
import { StyledUserLogin } from "./user-login";
import { optionsProductState } from "../helpers";

// Add a new product
const ProductNew = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit(
        "/api/products",
        fields,
        "/p#/merchant-account"
    );

    useEffect(() => {
        const { productName } = fields;
        let slug;
        if (productName) {
            slug = productName
                .trim()
                .replace(/[^\w\s]/gi, "")
                .toLowerCase()
                .split(" ")
                .join("-");
        }
        fields["productSlug"] = slug;
    }, [fields]);

    return (
        <StyledUserLogin>
            <div>
                {!!error && error == "product_name" && (
                    <div>Sorry, that name is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="productName"
                    placeholder="Product name"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="productCaption"
                    placeholder="Caption"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="productDescription"
                    placeholder="Description"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="price"
                    placeholder="Price"
                />
            </div>
            <div>
                <select onChange={handleChange} name="productStatus">
                    <option value="0">Status</option>
                    {optionsProductState()}
                </select>
            </div>
            <a onClick={submit}>submit</a>
        </StyledUserLogin>
    );
};

export default ProductNew;
