import React from "react"
import { VisLitLogo } from "../branding/VisLitLogo"
import { WriteLogTitle } from "../branding/WriteLogTitle"
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
                    <WriteLogTitle location="title__footer" color="title__green" />

                </section>

                <section className="footer__summary">

                    <h2 className="footer__heading">Summary</h2>
                    <p className="summary__p">
                        Assisting  writers with tracking, visualizing, and analyzing their writing projects.
                    </p>

                </section>

                <section className="footer__about">

                    <h2 className="footer__heading">About</h2>
                    <p className="about__p">
                        Then new column with created by Sam Edwards in TN, w/ linkedIn and github links
                    </p>
                    
                </section>

                <section className="footer__tech">
                    
                    <h2 className="footer__heading">Technologies Used</h2>
                    <div className="footer__lists">
                        
                        <div>
                            <h3 className="footer__subHeading">Development</h3>
                            <ul className="tech__list">
                                <li className="tech__item">React</li>
                                <li className="tech__item">VS Code</li>
                                <li className="tech__item">Ubuntu Linux</li>
                            </ul>
                        </div>
                        
                        <div className="footer__list">
                            <h3 className="footer__subHeading">Design</h3>
                            <ul className="tech__list">
                                <li className="tech__item">Inkscape</li>
                                <li className="tech__item">Colour Contrast Analyser</li>
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