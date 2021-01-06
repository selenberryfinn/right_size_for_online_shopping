import React, { useEffect } from "react";
// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";

const MerchantEdit = ({ merchantName }) => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/products/edit", fields);

    useEffect(() => {
        const { merchantName } = fields;
        let slug;
        if (merchantName) {
            slug = merchantName
                .trim()
                .replace(/[^\w\s]/gi, "")
                .toLowerCase()
                .split(" ")
                .join("-");
        }
        fields["merchantSlug"] = slug;
    }, [fields]);

    return (
        <React.Fragment>
            <div>
                {!!error && error == "product_name" && (
                    <div>Sorry, that name is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="merchantName"
                    placeholder="Merchant name"
                    value={merchantName}
                />
            </div>

            <a onClick={submit}>submit</a>
        </React.Fragment>
    );
};

export default MerchantEdit;
