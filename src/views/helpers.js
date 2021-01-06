import React from "react";
import moment from "moment";
// models
import axios from "../models/axios_csurf";

export const kebabToCamel = key => {
    let k;
    // check if key includes "_" and turn into camel case if so
    k = key.includes("_")
        ? key
            .toLowerCase()
            .split("_")
            .map((word, i) => {
                return i != 0 ? word[0].toUpperCase() + word.slice(1) : word;
            })
            .join("")
        : key;
    // If it's a single all-uppercase word, make lowercase (for the reducer)
    k = k === k.toUpperCase() ? k.toLowerCase() : k;
    return k;
};

export const camelToKebab = key => {
    return key
        .split(/(?=[A-Z])/)
        .map((word, i) => {
            return i != 0 ? word[0].toLowerCase() + word.slice(1) : word;
        })
        .join("_");
};

export const camelObjToKebab = obj => {
    let newObj = {};
    for (let key in obj) {
        newObj[camelToKebab(key)] = obj[key];
    }
    return newObj;
};

export const kebabObjToCamel = obj => {
    let newObj = {};
    for (let key in obj) {
        newObj[kebabToCamel(key)] = obj[key];
    }
    return newObj;
};

export const optionsYear = () => {
    let years = [];
    const year = new Date().getFullYear();
    for (let i = year; i > year - 130; i--) {
        let option = (
            <option key={i} value={i}>
                {i}
            </option>
        );
        years.push(option);
    }
    return years;
};

export const optionsMonth = () => {
    return (
        <React.Fragment>
            {<option value="1">Jan</option>}
            {<option value="2">Feb</option>}
            {<option value="3">Mar</option>}
            {<option value="4">Apr</option>}
            {<option value="5">May</option>}
            {<option value="6">Jun</option>}
            {<option value="7">Jul</option>}
            {<option value="8">Aug</option>}
            {<option value="9">Sep</option>}
            {<option value="10">Oct</option>}
            {<option value="11">Nov</option>}
            {<option value="12">Dec</option>}
        </React.Fragment>
    );
};

export const optionsDay = () => {
    let days = [];
    for (let i = 1; i < 32; i++) {
        let option = (
            <option key={i} value={i}>
                {i}
            </option>
        );
        days.push(option);
    }
    return days;
};

export const optionsGender = () => {
    return (
        <React.Fragment>
            {<option value="0">Gender</option>}
            {<option value="1">Female</option>}
            {<option value="2">Male</option>}
        </React.Fragment>
    );
};

export const optionsProductState = selected => {
    let productState = [];
    for (let i = 1; i <= 2; i++) {
        let option;
        if (selected == i) {
            option = (
                <option key={i} value={i} selected>
                    {i == 1 && "Deactivated"}
                    {i == 2 && "Activated"}
                </option>
            );
        } else {
            option = (
                <option key={i} value={i}>
                    {i == 1 && "Deactivated"}
                    {i == 2 && "Activated"}
                </option>
            );
        }
        productState.push(option);
    }
    return productState;
};

export const useFetchData = async (url, values) => {
    const { data } =
        (values && (await axios.post(url, values))) || (await axios.get(url));
    if (data.name == "error") {
        return data;
    }
    console.log("HELPER", data);
    let result = [];
    // console.log("KEBAB 1st");
    if (Array.isArray(data)) {
        data.map(obj => result.push(kebabObjToCamel(obj)));
    }
    // console.log("KEBAB 1st DONE");
    return result;
};

export const formatTimestamp = ts => {
    return moment(ts).format("YYYYMMDD HH:mm:ss");
};

export const useRelativeTime = timestamp => {
    return moment(timestamp).fromNow();
};
