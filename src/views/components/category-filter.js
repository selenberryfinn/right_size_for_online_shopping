import React, { useEffect, useState } from "react";

const CategoryFilterComponent = ({ category, callback, selectedCategory }) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (category.id == selectedCategory) {
            setIsChecked(true);
        }
        callback(category.id, isChecked);
    }, [isChecked]);

    const handleInputChange = async e => {
        const value =
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value;
        setIsChecked(value);
    };

    return (
        <input
            name="isGoing"
            type="checkbox"
            checked={isChecked}
            onChange={handleInputChange}
        />
    );
};

export default CategoryFilterComponent;
