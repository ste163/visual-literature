import React from "react"
import { WriteLogLogo } from "../branding/WriteLogLogo"
import { WriteLogTitle } from "../branding/WriteLogTitle"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer>
            <div className="footer__row1">
                <section className="footer__branding">
                    Write log logo and text then a short summary about what it is.
                </section>
                <section className="footer__about">
                    Then new column with created by Sam Edwards in TN, w/ linkedIn and github links
                </section>
                <section className="footer__technologies">
                    Then new Column with Technologies and list all those used
                </section>
            </div>
            <div className="footer__row2">
                at very bottom is the copyright 2020 by Sam Edwards
            </div>
        </footer>
    )
}