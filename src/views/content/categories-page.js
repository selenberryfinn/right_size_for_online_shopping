import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Controllers
import {
    getCategories,
    getProductsByCategories
} from "../../controllers/actions";
import styled from "styled-components";

// Views

import ItemCollageComponent from "../components/item-collage";
import ProductItemComponent from "../components/product-item-component";
import CategoryFilterComponent from "../components/category-filter";
import { PublicWrapper, OuterContent, InnerContent } from "../page/public-page";
import PublicHeader from "../header/public-header";
import PublicFooter from "../footer/public-footer";

import { Phone, Repeat, Home, Truck, Tshirt } from "../style/icons";
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
const StyledCategoryPage = styled.div``;

const Splitter = styled.div`
    display: flex;
    flex-direction: row;
`;

const CategoryFilterSidebar = styled.div`
    display: flex;
    flex-direction: column;
    height: 20vh;
    overflow-y: scroll;
    min-width: 300px;
    padding: 15px;
    width: 25%;
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;

    &::-webkit-scrollbar {
        height: 12px;
        width: 7px;
        border-radius: 2px;
        background: transparent;
        transition: all 0.3s ease;
    }
    &::-webkit-scrollbar:hover {
        background: #dedede;
    }
    &::-webkit-scrollbar-thumb {
        background: #dedede;
        border-radius: 4px;
    }
`;

const ProductCardWrapper = styled.div`
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: row;
    min-height: 100vh;
    /* border: 3px dashed purple; */
    min-width: 75%;
`;

const CategoriesPage = props => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const categoryIds = [];
    !!categories &&
        categories.map(category => {
            categoryIds.push(category.id);
        });

    const [selectedCategories, setSelectedCategories] = useState(categoryIds);
    const productsByCategories = useSelector(
        state => state.productsByCategories
    );

    useEffect(() => {
        dispatch(getCategories());
        dispatch(getProductsByCategories(selectedCategories));
    }, [selectedCategories]);

    const handleCategorySelect = (id, isChecked) => {
        console.log(id, isChecked);
        selectedCategories.includes(id)
            ? setSelectedCategories(
                selectedCategories.filter(i => i != id && i)
            )
            : setSelectedCategories([...selectedCategories, id]);
    };

    if (!productsByCategories) {
        return null;
    }
    // console.log("IN CATEGORY PAGE AFTER", productsByCategories);

    return (
        <StyledCategoryPage>
            <Splitter>
                <CategoryFilterSidebar>
                    {!!categories &&
                        categories.map((category, index) => (
                            <div key={index}>
                                <CategoryFilterComponent
                                    category={category}
                                    callback={handleCategorySelect}
                                />
                                &nbsp;{category.categoryName}
                            </div>
                        ))}
                </CategoryFilterSidebar>

                <ProductCardWrapper>
                    {!!productsByCategories &&
                        productsByCategories.map((product, index) => (
                            <ProductItemComponent
                                key={index}
                                title={product.productName}
                                ratio="1.25"
                                cols="3"
                                height="100px"
                                item={product}
                            />
                        ))}
                </ProductCardWrapper>
            </Splitter>
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
            <ItemCollageComponent cols="5" items={items1} />
        </StyledCategoryPage>
    );
};

export default CategoriesPage;
