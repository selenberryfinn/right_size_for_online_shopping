import React, { useEffect } from "react";
// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";

const CategoryNew = () => {
    const [fields, handleChange] = useStatefulFields();
    const [error, submit] = useAuthSubmit("/api/categories", fields);

    useEffect(() => {
        const { categoryName } = fields;
        let slug;
        if (categoryName) {
            slug = categoryName
                .trim()
                .replace(/[^\w\s]/gi, "")
                .toLowerCase()
                .split(" ")
                .join("-");
        }
        fields["categorySlug"] = slug;
    }, [fields]);

    return (
        <React.Fragment>
            <div>
                {!!error && error == "category_name" && (
                    <div>Sorry, that name is already taken</div>
                )}
                <input
                    onChange={handleChange}
                    name="categoryName"
                    placeholder="Category name"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="categoryCaption"
                    placeholder="Caption"
                />
            </div>
            <div>
                <input
                    onChange={handleChange}
                    name="categoryDescription"
                    placeholder="Description"
                />
            </div>
            <a onClick={submit}>submit</a>
        </React.Fragment>
    );
};

export default CategoryNew;
