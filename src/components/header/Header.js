import React from "react"
import { useHistory } from "react-router-dom"
import "./Header.css"

export const Header = () => {

    const history = useHistory()

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
                            <button onClick={() => history.push("/projects")}>Projects</button>
                        </li>
                        <li className="nav__item">
                        <button onClick={() => history.push("/dashboard")}>Dashboard</button>
                        </li>
                    </div>
                    <li className="nav__item nav__rightAligned">
                        <button onClick={() => {
                           sessionStorage.clear("userId")
                           history.push("/")
                        }}>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}