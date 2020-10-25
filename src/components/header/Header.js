import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { VisLitLogo } from "../branding/VisLitLogo"
import { VisLitTitle } from "../branding/VisLitTitle"
import { IconLogout } from "../icons/IconLogout"
import "./Header.css"

export const Header = () => {

    const history = useHistory()
    const location = useLocation()

    // We will set the nav with the current location.pathname
    // const [activeNav, setNav] = useState()

    let activeNavItem = location.pathname

    // useEffect(() => {
    //     Location doesn't show on load because it takes a couple seconds
    //     for it to run. This delay happens when clicking the buttons, too.
    //     console.log(location.pathname)
    //     setNav(location.pathname)
    // }, [])

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
                            <button className="nav__btn" onClick={() => {
                                history.push("/projects")
                                activeNavItem = "/projects"
                                console.log("CURRENT NAV", activeNavItem)
                            }}>
                                Projects
                            </button>
                        </li>

                        <li className="nav__item">
                            <button className="nav__btn"  onClick={() => {
                                history.push("/dashboard")
                                activeNavItem = "/dashboard"
                                console.log("CURRENT NAV", activeNavItem)
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
                            // Currently getting the SVGs, need to loop through childNodes and classList.add the darkened color w/ transition time
                            // SEE SPIRAL for how i did it there
                            // Then on mouseOut, classList.remove
                           e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                                svg.classList.add("icon__hovered")
                                console.log(svg)
                            })
                        }}>
                            <IconLogout />
                            Logout
                        </button>
                        
                    </li>

                </ul>

            </nav>

        </header>
    )
}