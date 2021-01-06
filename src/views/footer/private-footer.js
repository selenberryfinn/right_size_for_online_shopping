// VIEW
import React from "react";
import styled from "styled-components";

import FooterItemComponent from "../components/footer-item-component";
import { Outer, Inner } from "../style/global";

const NewsletterOuter = styled(Outer)`
    flex: none;
    min-height: 150px;
    background: #203139;
`;

const NewsletterInner = styled(Inner)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-family: "Raleway";
    font-size: 18px;
    line-height: 1.5;
    text-align: center;
    color: #fff;
`;

const FooterOuter = styled(Outer)`
    flex: none;
    background: #222d32;
`;

const FooterInner = styled(Inner)`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-start;
`;

const navLinks1 = [
    {
        id: 1,
        title: "About localhost.com"
    },
    {
        id: 2,
        title: "Brands"
    },
    {
        id: 3,
        title: "Login for shops",
        to: "merchant-account"
    },
    {
        id: 4,
        title: "Become a part of the team"
    }
];

const navLinks2 = [
    {
        id: 1,
        title: "Questions and answers"
    },
    {
        id: 2,
        title: "Return and exchange"
    },
    {
        id: 3,
        title: "Terms and conditions"
    },
    {
        id: 4,
        title: "Contact"
    }
];
const navLinks3 = [
    {
        id: 1,
        title: "Jobs"
    },
    {
        id: 2,
        title: "Privacy and cookie policy"
    },
    {
        id: 3,
        title: "Giftcards"
    },
    {
        id: 4,
        title: "Blog"
    }
];

const navLinks4 = [
    {
        id: 1,
        title: "English"
    },
    {
        id: 2,
        title: `På localhost.com you can shop directly from the best independent fashion stores in the country. Read more`
    }
];

const PrivateFooter = () => {
    return (
        <React.Fragment>
            <NewsletterOuter>
                <NewsletterInner>Newsletter Signup</NewsletterInner>
            </NewsletterOuter>
            <FooterOuter>
                <FooterInner>
                    <FooterItemComponent
                        title={"About"}
                        ratio="1.5"
                        cols="5"
                        height="100px"
                        items={navLinks1}
                    />
                    <FooterItemComponent
                        title={"Help"}
                        ratio="1.5"
                        cols="5"
                        height="100px"
                        items={navLinks2}
                    />
                    <FooterItemComponent
                        title={"Other"}
                        ratio="1.5"
                        cols="5"
                        height="100px"
                        items={navLinks3}
                    />
                    <FooterItemComponent
                        title={"Languages"}
                        ratio="1.5"
                        cols="3"
                        height="100px"
                        items={navLinks4}
                    />
                </FooterInner>
            </FooterOuter>
        </React.Fragment>
    );
};

export default PrivateFooter;
