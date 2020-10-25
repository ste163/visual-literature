import React from "react"
import { VisLitLogo } from "../branding/VisLitLogo"
import { VisLitTitle } from "../branding/VisLitTitle"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
            <div className="footer__row1">

                <section className="footer__branding">
                    <VisLitLogo
                    location="logo__footer"
                    colorVis="logo__color--lightBlack"
                    colorLit="logo__color--lightBlack"
                    colorVisDot="logo__color--lightBlack"
                    colorLitDot="logo__color--lightBlack"/>
                    <VisLitTitle location="title__footer" color="title__lightBlack" />
                </section>

                <section className="footer__summary">
                    <h2 className="footer__heading">Summary</h2>
                    <p className="summary__p">
                        Visual Literature (VISLIT) assists writers by allowing them to track, visualize, and analyze their writing projects.
                    </p>
                </section>

                <section className="footer__about">
                    <h2 className="footer__heading">About</h2>
                    <p className="about__p">
                        Sam Edwards is a creative writer and web development student at <a href="http://nashvillesoftwareschool.com/">Nashville Software School</a>.
                        <div>
                            <a href="https://www.linkedin.com/in/st-edwards">LinkedIn</a>
                        </div>
                        <div>
                            <a href="https://github.com/ste163">Github</a>
                        </div>
                    </p>
                </section>

                <section className="footer__tech">
                    <h2 className="footer__heading">Technologies Used</h2>
                    <div className="footer__lists">
                        
                        <div>
                            <h3 className="footer__subHeading">Development</h3>
                            <ul className="tech__list">
                                <li className="tech__item"><a href="https://reactjs.org/">React</a></li>
                                <li className="tech__item"><a href="https://code.visualstudio.com/">VS Code</a></li>
                                <li className="tech__item"><a href="https://ubuntu.com/">Ubuntu Linux</a></li>
                            </ul>
                        </div>
                        
                        <div className="footer__list">
                            <h3 className="footer__subHeading">Design</h3>
                            <ul className="tech__list">
                                <li className="tech__item"><a href="https://inkscape.org/">Inkscape</a></li>
                                <li className="tech__item"><a href="https://dribbble.com/">Dribbble</a></li>
                                <li className="tech__item"><a href="https://developer.paciellogroup.com/resources/contrastanalyser/">Colour Contrast Analyser</a></li>
                            </ul>
                        </div>
                    
                    </div>
                </section>
            </div>

            <div className="footer__row2">
                &#169; 2020 Sam Edwards
            </div>

        </footer>
    )
}