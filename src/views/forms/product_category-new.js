import React, { useEffect } from "react";
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";

const MerchantNew = props => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/merchants", fields);

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
                {!!error && error == "merchant_name" && (
                    <div>Sorry, that name is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="merchantName"
                    placeholder="Merchant name"
                />
            </div>
            <a onClick={submit}>submit</a>
        </React.Fragment>
    );
};

export default MerchantNew;
