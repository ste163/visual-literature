import React, { useEffect, useRef, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { VisLitLogo } from "../branding/VisLitLogo"
import { VisLitTitle } from "../branding/VisLitTitle"
import { IconLogout } from "../icons/IconLogout"
import { IconGear } from "../icons/IconGear"
import { HeaderSettings } from "./HeaderSettings"
import { Modal } from "../modal/Modal"
import "./Header.css"

export const Header = () => {

    const history = useHistory()
    const location = useLocation()

    // Get references for nav buttons and underline
    const btnProj = useRef()
    const btnDash = useRef()
    const btnTable = useRef()
    const navLine = useRef()

    // Get references for modals
    const settingsModal = useRef()

    const [currentLocation, setCurrentLocation] = useState(location.pathname)

    useEffect(() => {
        setCurrentLocation(location.pathname)
    }, [location.pathname])

    const navLineMouseLeave = () => {
        navLine.current.className = `${currentLocation.includes("/projects") ? "nav__line nav__line--projects" :
        currentLocation.includes("/dashboard") ? "nav__line nav__line--dashboard" : "nav__line nav__line--table"}`
    }

    return (
        <header className="header">

            <section className="header__branding">
                <VisLitLogo
                location="logo__header"
                colorVis="logo__color--mintBlue"
                colorLit="logo__color--white"
                colorVisDot="logo__color--mintBlue"
                colorLitDot="logo__color--white"/>
                <VisLitTitle location="title__header" color="title__white" />
            </section>

            <nav className="header__nav">
                <ul className="nav__list">
                    <div className="nav__centered">
                        <li className="nav__item">
                            <button 
                            ref={btnProj}
                            className={currentLocation.includes("/projects") ? "nav__btn nav__btn--active" : "nav__btn"}
                            onMouseEnter={e => navLine.current.className = "nav__line nav__line--projects"}
                            onMouseLeave={e => navLineMouseLeave()}
                            onClick={ e => history.push("/projects")}>
                                Projects
                            </button>
                        </li>

                        <li className="nav__item">
                            <button 
                            className="nav__btn"
                            ref={btnTable}
                            className={currentLocation.includes("/table") ? "nav__btn nav__btn--active" : "nav__btn"}
                            onMouseEnter={e => navLine.current.className = "nav__line nav__line--table"}
                            onMouseLeave={e => navLineMouseLeave()}
                            onClick={e => history.push("/table")}
                            >
                                Table
                            </button>
                        </li>

                        <li className="nav__item">
                            <button
                            ref={btnDash}
                            className={currentLocation.includes("/dashboard") ? "nav__btn nav__btn--active" : "nav__btn"}
                            onMouseEnter={e => navLine.current.className = "nav__line nav__line--dashboard"}
                            onMouseLeave={e => navLineMouseLeave()}
                            onClick={e => history.push("/dashboard")}>
                                Dashboard
                            </button>
                        </li>

                        <div 
                        ref={navLine}
                        className={currentLocation.includes("/projects") ? "nav__line nav__line--projects" : 
                                    currentLocation.includes("/dashboard") ? "nav__line nav__line--dashboard" : "nav__line nav__line--table"}>
                        </div>
                    </div>

                    <div className="nav__rightAligned">
                        <li className="nav__item">
                            <button className="nav__btn btn__settings"
                            onClick={() => { 
                                settingsModal.current.className = "background__modal modal__active"
                            }}
                            onMouseOver={e => {
                                const svg = e.currentTarget.firstElementChild.children[1].classList
                                svg.remove("icon__white")
                                svg.add("icon__hovered")
      
                                }}
                                onMouseLeave={e => {
                                    const svg = e.currentTarget.firstElementChild.children[1].classList
                                    svg.remove("icon__hovered")
                                    svg.add("icon__white")
                                }}>
                                <IconGear color="icon__white" />
                                Settings
                            </button>
                        </li>
                        
                        <li className="nav__item">
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
                            onMouseLeave={e => {
                                e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                                    svg.classList.remove("icon__hovered")
                                    svg.classList.add("icon__white")
                                })
                            }}>
                                <IconLogout color="icon__white" />
                                Logout
                            </button>
                        </li>
                    </div>
                </ul>
            </nav>

            <Modal  ref={settingsModal} contentFunction={<HeaderSettings/>} width={"modal__width--med"}/>
        
        </header>
    )
}