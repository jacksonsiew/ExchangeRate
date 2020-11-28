import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = () => {
    return (
        <div>
            <div className="slide-container">
                <style>
                    {`
                        .each-fade {
                            display: flex;
                        }
                        .each-fade  img {
                            width: 100%;
                            max-height:300px;
                            height:300px;
                            object-fit: cover;
                        }
                    `}{" "}
                </style>
                <Fade duration={5000} indicators={true}>
                    <div className="each-fade">
                        <img alt="slide1" src={require("../../assets/img/slide_1.jpg")} />
                    </div>
                    <div className="each-fade">
                        <img alt="slide2" src={require("../../assets/img/slide_2.jpg")} />
                    </div>
                    <div className="each-fade">
                        <img alt="slide3" src={require("../../assets/img/slide_3.jpg")} />
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export { Slideshow };
