import React, { useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { VisLitLogo } from "../branding/VisLitLogo"
import { VisLitTitle } from "../branding/VisLitTitle"
import { IconLogout } from "../icons/IconLogout"
import "./Header.css"

export const Header = () => {

    const history = useHistory()

    const btnProj = useRef()
    const btnDash = useRef()

    // Refactor header so each item is it's own element on the grid
    // for perfect, aligned placement
    return (
        <header className="header">

            <section className="header__branding">
                <VisLitLogo
                location="logo__header"
                colorVis="logo__color--white"
                colorLit="logo__color--white"
                colorVisDot="logo__color--white"
                colorLitDot="logo__color--white"/>
                <VisLitTitle location="title__header" color="title__white" />
            </section>

            <nav className="header__nav">
                <ul className="nav__list">
                    <div className="nav__centered">
                        <li className="nav__item">
                            <button 
                            ref={btnProj}
                            className="nav__btn nav__btn--active"
                            onClick={ e => {
                                history.push("/projects")
                                btnProj.current.className = "nav__btn nav__btn--active"
                                btnDash.current.className = "nav__btn"
                            }}>
                                Projects
                            </button>
                        </li>

                        <li className="nav__item">
                            <button
                            ref={btnDash}
                            className="nav__btn"
                            onClick={ e => {
                                history.push("/dashboard")
                                btnProj.current.className = "nav__btn"
                                btnDash.current.className = "nav__btn nav__btn--active"
                            }}>
                                Dashboard
                            </button>
                        </li>      

                        <div className="nav__line"></div>
                    </div>

                    <li className="nav__item nav__rightAligned">
                        <button className="nav__btn btn__logout" 
                        onClick={() => {
                           sessionStorage.clear("userId")
                           history.push()
                        }}
                        onMouseOver={e => {
                           e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                                svg.classList.remove("icon__white")
                                svg.classList.add("icon__hovered")
                            })
                        }}
                        onMouseOut={e => {
                            e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                                svg.classList.remove("icon__hovered")
                                svg.classList.add("icon__white")
                            })
                        }}>
                            <IconLogout color="icon__white" />
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>

        </header>
    )
}