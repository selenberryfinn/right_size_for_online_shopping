import React from "react";
import { Link } from "react-router-dom";

// Controllers
import { useStatefulFields, useAuthSubmit } from "../../controllers/hooks";
// Views
import styled from "styled-components";
import { StyledUserLogin } from "./user-login";

const StyledUserNew4 = styled(StyledUserLogin)`
    & > span {
        width: 100%;

        & > div input,
        div select {
            min-width: 500px;
            height: 100%;
            padding: 16px 7px;
        }
    }
`;

const Title = styled.div`
    text-transform: uppercase:
    color: #111;
    line-height: 28px;
    font-size: 20px;
    margin: 10px 0;
    font-weight: 300px;
`;

const Splitter = styled.div`
    display: flex;
`;

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

const SideElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 350px;
    min-width: 600px;
    width: 100%;
`;

const UserNew4 = () => {
    const [fields, handleChange] = useStatefulFields();
    console.log(fields);
    const [error, submit] = useAuthSubmit("/api/user-sizes", fields);
    return (
        <StyledUserNew4>
            <Title>Enter your sizes for better recommendations</Title>
            <span>
                <Splitter>
                    <MainWrapper>
                        <div>
                            <input
                                onChange={handleChange}
                                name="bust"
                                type="number"
                                placeholder="Bust"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                name="shoulder"
                                type="number"
                                placeholder="Shoulder"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                name="sleeve"
                                type="number"
                                placeholder="Sleeve "
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                name="waist"
                                type="number"
                                placeholder="Waist"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                name="hip"
                                type="number"
                                placeholder="Hip"
                            />
                        </div>
                        <div>
                            <input
                                onChange={handleChange}
                                name="insideLeg"
                                type="number"
                                placeholder="Inside leg"
                            />
                        </div>
                    </MainWrapper>
                    <SideElement>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/weIIcvIz-8A"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </SideElement>
                </Splitter>
            </span>
            <a onClick={submit}>submit</a>

            <div>
                or <Link to="/">Finish later</Link>
            </div>
        </StyledUserNew4>
    );
};

export default UserNew4;
