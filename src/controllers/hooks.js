// CONTROLLER

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
// Models
import axios from "../models/axios_csurf";

// Views
import { useFetchData } from "../views/helpers";

export const useStatefulSearch = (profileId, searchCategory) => {
    const [fields, setFields] = useState({});
    const handleSearchForFriends = ({ target }) => {
        let ignore;
        (async () => {
            let data;
            if (target.value != "") {
                ignore = false;
                if (searchCategory == "friends") {
                    data = await useFetchData(
                        `/api/profiles/${profileId}/friends/search/${target.value}`
                    );
                } else {
                    data = await useFetchData(
                        `/api/profiles/search/${target.value}`
                    );
                }
                if (!data) {
                    data = [""];
                }
            }
            data = !data
                ? []
                : (data = !Array.isArray(data) && data ? [data] : data);
            if (!ignore && data) {
                setFields({
                    ...fields,
                    data: data
                });
            }
        })();
        return () => {
            ignore = true;
        };
    };
    return [fields, handleSearchForFriends];
};

export const useStatefulFields = () => {
    const [fields, setFields] = useState({});
    const handleChange = ({ target }) => {
        setFields({
            ...fields,
            [target.name]: target.value
        });
    };
    return [fields, handleChange];
};

export const useAuthSubmit = (url, fields, redirectUrl = "/") => {
    const [error, setError] = useState(false);
    const submit = async () => {
        const { data } = await axios.post(url, fields);
        if (data.name == "error") {
            if (data.constraint == "profiles_email_key") {
                setError("email");
            }
            if (data.constraint == "profiles_password_key") {
                setError("password");
            }
            console.log(data);
        } else {
            location.replace(`${redirectUrl}`);
        }
    };
    return [error, submit];
};

export const useOutsideAlerter = (onOuterClick, innerRef) => {
    useEffect(
        () => {
            // only add listener, if the element exists
            if (innerRef.current) {
                document.addEventListener("click", handleClick);
            }

            // unmount previous first in case inputs have changed
            return () => document.removeEventListener("click", handleClick);

            function handleClick(e) {
                innerRef.current &&
                    !innerRef.current.contains(e.target) &&
                    onOuterClick(e);
            }
        },
        [onOuterClick, innerRef] // invoke again, if inputs have changed
    );
};
