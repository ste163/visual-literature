import React from "react"
import "./Header.css"

export const Header = () => {

    return (
        <header className="header">
            <section>
                LOGO
                WRITE LOG
            </section>
            <nav>
                <ul className="nav__list">
                    <div className="nav__centered">
                        <li className="nav__item">
                            PROJECTS
                        </li>
                        <li className="nav__item">
                            DASHBOARD
                        </li>
                    </div>
                    <li className="nav__item nav__rightAligned">
                        LOGOUT
                    </li>
                </ul>
            </nav>
        </header>
    )
}