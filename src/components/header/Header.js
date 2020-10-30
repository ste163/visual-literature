import React, { useEffect, useRef, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { VisLitLogo } from "../branding/VisLitLogo"
import { VisLitTitle } from "../branding/VisLitTitle"
import { IconLogout } from "../icons/IconLogout"
import "./Header.css"

export const Header = () => {

    const history = useHistory()
    const location = useLocation()

    // Get references for nav buttons and underline
    const btnProj = useRef()
    const btnDash = useRef()
    const navLine = useRef()

    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location.pathname])

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
                            className={currentLocation === "/projects" ? "nav__btn nav__btn--active" : "nav__btn"}
                            onMouseEnter={e => navLine.current.className = "nav__line nav__line--projects"}
                            onMouseLeave={e => navLine.current.className = `${currentLocation === "/projects" ? "nav__line nav__line--projects" : "nav__line nav__line--dashboard"}`}
                            onClick={ e => history.push("/projects")}>
                                Projects
                            </button>
                        </li>

                        <li className="nav__item">
                            <button
                            ref={btnDash}
                            className={currentLocation !== "/projects" ? "nav__btn nav__btn--active" : "nav__btn"}
                            onMouseEnter={e => navLine.current.className = "nav__line nav__line--dashboard"}
                            onMouseLeave={e => navLine.current.className = `${currentLocation === "/projects" ? "nav__line nav__line--projects" : "nav__line nav__line--dashboard"}`}
                            onClick={ e => history.push("/dashboard")}>
                                Dashboard
                            </button>
                        </li>      

                        <div 
                        ref={navLine}
                        className={currentLocation === "/projects" ? "nav__line nav__line--projects" : "nav__line nav__line--dashboard"}>
                        </div>
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