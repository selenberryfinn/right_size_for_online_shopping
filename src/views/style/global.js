import styled, { css, createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        text-decoration: none;

    }

    html,
    body {
        margin: 0;
        height: 100%;
        min-height: 100%;
        line-height: 1.2
        color: #666;
        font-family: Verdana,Arial;
        font-weight: normal;
        font-style: normal;
        line-height: 20px;
    }

    body {
        display: flex;
        flex-direction: column;


    }

    main {
        position: relative;
    }
`;

export const Outer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

export const Inner = styled.div`
    max-width: 1200px;
    width: 100%;
`;
