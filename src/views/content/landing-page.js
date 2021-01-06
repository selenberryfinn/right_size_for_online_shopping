import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Controllers
import { getCategories } from "../../controllers/actions";
import styled from "styled-components";

// Views
import PhotoCollageComponent from "../components/photo-collage";
import ItemCollageComponent from "../components/item-collage";
import CategoriesCollageComponent from "../components/categories-collage";
import { ChevronRight } from "../style/icons";
import { Phone, Repeat, Home, Truck, Tshirt } from "../style/icons";
const StyledLandingPage = styled.div``;
const photos1 = [
    {
        id: 1,
        url: "/images/kid.jpg",
        category_id: 1,
        caption: "Kids",
        to: "categories"
    },
    {
        id: 2,
        url: "/images/men.jpg",
        category_id: 2,
        caption: "Men",
        to: "categories"
    },
    {
        id: 3,
        url: "/images/women.jpg",
        category_id: 3,
        caption: "Women",
        to: "categories"
    }
];
const photos2 = [
    {
        id: 1,
        url: "/images/model1.gif",
        category_id: 2,
        caption: "Power dressing",
        to: "categories"
    },
    {
        id: 2,
        url: "/images/model2.jpeg",
        category_id: 3,
        caption: "Everyday dresses",
        to: "categories"
    },
    {
        id: 3,
        url: "/images/model3.jpeg",
        category_id: 1,
        caption: "The festival edit",
        to: "categories"
    }
];
const items1 = [
    {
        id: 1,
        svg: <Phone />,
        title: "Need help?",
        caption: "Contact us here or find answers in our FAQ"
    },
    {
        id: 2,
        svg: <Repeat />,
        title: "Free return",
        caption:
            "Exchange or return your products free of charge within 14 days"
    },
    {
        id: 3,
        svg: <Home />,
        title: "Shop locally online",
        caption: "We show fashing from +30 fashion shops"
    },
    {
        id: 4,
        svg: <Truck />,
        title: "Fast delivery",
        caption: "Free shipping on €100 orders or more"
    },
    {
        id: 5,
        svg: <Tshirt />,
        title: "+1000 products",
        caption: "From more than 50 brands"
    }
];

const Hero = styled.a`
    display: block;
    height: 400px;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    line-height: 44px;
    cursor: pointer;
    padding: 43px;

    & > img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: none;
        object-position: 100 100; /* positioned top left of the content box */
    }
    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1;
    }

    & > span {
        z-index: 1;
        color: ghostwhite;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    }

    & > span:nth-child(2) {
        font-size: 44px;
        margin-bottom: 10px;
        font-weight: 600;
    }
    & > span:nth-child(3) {
        font-size: 28px;
        margin-bottom: 10px;
    }
    & > span:nth-child(4) {
        font-size: 28px;
        margin-bottom: 10px;
    }
`;

const LandingPage = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);

    useEffect(() => {
        dispatch(getCategories());
    }, []);

    if (!categories) {
        return null;
    }
    console.log("IN MERCHANT PRODUCTS", categories);

    return (
        <StyledLandingPage>
            <Hero>
                <img src="/images/heroban.jpg" alt="hero-banner-women" />
                <span>Dresses</span>
                <span>Find the right outfit</span>
                <span>
                    <ChevronRight color="ghostwhite" strokeWidth="3" /> Shop now
                </span>
            </Hero>
            <ItemCollageComponent cols="5" items={items1} />
            <PhotoCollageComponent photos={photos1} cols="3" ratio="1.1" />
            <CategoriesCollageComponent cols="6" items={categories} />
            <ItemCollageComponent
                ratio="1.5"
                cols="2"
                height="100px"
                items={[
                    {
                        id: 1,
                        title: "Shop locally online",
                        caption:
                            "Shop from +50 brands and more than 1000 products"
                    }
                ]}
            />

            <PhotoCollageComponent photos={photos2} cols="3" ratio="1.5" />
        </StyledLandingPage>
    );
};

export default LandingPage;
