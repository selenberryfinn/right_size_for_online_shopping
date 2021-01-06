import React, { useEffect, useState } from "react";
import { useStatefulFields } from "../../controllers/hooks";
import { useFetchData } from "../helpers";

const SearchBar = ({ callback }) => {
    const [{ query }, handleChange] = useStatefulFields();

    useEffect(() => {
        let ignore;
        (async () => {
            if (query != "") {
                ignore = false;
                const data = await useFetchData(
                    `/api/products/search/${query}`
                );
                !ignore && callback(data);
            } else {
                !ignore && callback([]);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [query]);

    return (
        <React.Fragment>
            <input
                onChange={handleChange}
                name="query"
                placeholder="Search..."
                autoComplete="off"
            />
        </React.Fragment>
    );
};

export default SearchBar;
