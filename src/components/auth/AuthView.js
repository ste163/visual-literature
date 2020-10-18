import React, { useRef, useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import "./AuthView.css"

export const AuthView = props => {

    const usernameLogin = useRef()
    const usernameRegister = useRef()
    const existDialog = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    // useEffect and state are used
    // to re-render the form, based on whether
    // it's Login or Register
    const [ activeBtn, setBtn] = useState(true)

    useEffect(() => {
        activeBtn ? setBtn(true) : setBtn(false);
    }, [])

    // Fetch for only login field
    const existingUserCheckLogin = () => {
        return fetch(`http://localhost:8088/users?username=${usernameLogin.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    // Fetch for only register field
    const existingUserCheckRegister = () => {
        return fetch(`http://localhost:8088/users?username=${usernameRegister.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheckLogin()
            .then(exists => {
                if (exists) {
                    sessionStorage.setItem("userId", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        existingUserCheckRegister()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            username: usernameRegister.current.value,
                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                sessionStorage.setItem("userId", createdUser.id)
                                history.push("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
    }

    return (
        <main className="auth__container">
            <dialog ref={existDialog}>
                <div>User does not exist</div>
                <button onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <dialog ref={conflictDialog}>
                <div>Account with that username already exists</div>
                <button onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <h1 className="title">Write Log</h1>
            <h2 className="subtitle">Track, visualize, & analyze your writing projects</h2>

            <section className="card card__auth">
                <ul  className="auth__btns">
                    <li className="btns__li">
                        <button
                        className={activeBtn ? "auth__btn auth__btn--active" : "auth__btn"}
                        onClick={e => {setBtn(true)}}
                        >Log in</button>
                    </li>
                    <li className="btns__li">
                        <button
                        className={activeBtn ? "auth__btn" : "auth__btn auth__btn--active"}
                        onClick={e => {setBtn(false)}}
                        >Register</button>
                    </li>
                    <div className={activeBtn ? "auth__line line__login--active" : "auth__line line__register--active"}></div>
                </ul>
                <section>
                    <form className="form"
                    onSubmit={activeBtn ? handleLogin : handleRegister}>
                        <fieldset>
                            <label htmlFor={activeBtn ? "usernameLogin" : "usernameRegister"}>Username</label>
                            <input ref={activeBtn ? usernameLogin : usernameRegister} type="text"
                                id={activeBtn ? "usernameLogin" : "usernameRegister"}
                                placeholder="Author123"
                                required autoFocus />
                        </fieldset>
                        <fieldset className="fieldset__btn">
                            <button className="btn" type="submit">{activeBtn ? "Login" : "Register"}</button>
                        </fieldset>
                    </form>
                </section>
            </section>

        </main>
    )
}