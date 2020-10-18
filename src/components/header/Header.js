import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { WriteLogLogo } from "../branding/WriteLogLogo"
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

    return (
        <header className="header">
            <section className="header__branding">
                <WriteLogLogo props="logo__header"/>
                WRITE LOG
            </section>
            <nav className="header__nav">
                <ul className="nav__list">
                    <div className="nav__centered">
                        <li className="nav__item">
                            <button className="nav__btn" onClick={() => {
                                history.push("/projects")
                                activeNavItem = "/projects"
                                console.log("CURRENT NAV", activeNavItem)
                            }}
                            >Projects</button>
                        </li>
                        <li className="nav__item">
                            <button className="nav__btn"  onClick={() => {
                                history.push("/dashboard")
                                activeNavItem = "/dashboard"
                                console.log("CURRENT NAV", activeNavItem)
                            }}
                            >Dashboard</button>
                        </li>
                        <div className="nav__line"></div>
                    </div>
                    <li className="nav__item nav__rightAligned">
                        <button
                        className="nav__btn" 
                        onClick={() => {
                           sessionStorage.clear("userId")
                           history.push()
                        }}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}