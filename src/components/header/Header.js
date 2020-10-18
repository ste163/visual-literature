import React, { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router-dom"
import "./Header.css"

export const Header = () => {

    const history = useHistory()
    const location = useLocation()

    // We will set the nav with the current location.pathname
    const [activeNav, setNav] = useState()

    useEffect(() => {
        // Location doesn't show on load because it takes a couple seconds
        // for it to run. This delay happens when clicking the buttons, too.
        console.log(location.pathname)
        setNav(location.pathname)
        console.log("ACTIVE NAV IS", activeNav)
    }, [])

    return (
        <header className="header">
            <section>
                LOGO
                WRITE LOG
            </section>
            <nav className="header__nav">
                <ul className="nav__list">
                    <div className="nav__centered">
                        <li className="nav__item">
                            <button className="nav__btn" onClick={() => {
                                history.push("/projects")
                                setNav(location.pathname)
                                console.log("CURRENT NAV", activeNav)
                            }}
                            >Projects</button>
                        </li>
                        <li className="nav__item">
                        <button className="nav__btn"  onClick={() => {
                            history.push("/dashboard")
                            setNav(location.pathname)
                            console.log("CURRENT NAV", activeNav)
                        }}
                            >Dashboard</button>
                        </li>
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