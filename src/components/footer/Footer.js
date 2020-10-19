import React from "react"
import { WriteLogLogo } from "../branding/WriteLogLogo"
import { WriteLogTitle } from "../branding/WriteLogTitle"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
            <div className="footer__row1">
                <section className="footer__branding">
                    <div className="branding__row1">
                        <WriteLogLogo location="logo__footer" color="logo__green" line="logo__line--invisible"/>
                        <WriteLogTitle location="title__footer" color="title__green" />
                    </div>
                    <p className="branding__summary">
                        Assisting  writers with tracking, visualizing, and analyzing their writing projects.
                    </p>
                </section>
                <section className="footer__about">
                    <p className="about__p">
                        Then new column with created by Sam Edwards in TN, w/ linkedIn and github links
                    </p>
                </section>
                <section className="footer__tech">
                    <ul className="tech__list">
                        <li className="tech__item">React</li>
                        <li className="tech__item">Inkscape</li>
                        <li className="tech__item">Colour Contrast Analyser</li>
                        <li className="tech__item">VS Code</li>
                        <li className="tech__item">Ubuntu Linux</li>
                    </ul>
                </section>
            </div>
            <div className="footer__row2">
                &#169; 2020 Sam Edwards
            </div>
        </footer>
    )
}