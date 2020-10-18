import React, { useRef } from "react"
import { useHistory } from "react-router-dom";
import "./AuthView.css"

export const AuthView = props => {

    const usernameLogin = useRef()
    const usernameRegister = useRef()
    const existDialog = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

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
            <h2 className="subtitle">Writing tracking, visualization, & analysis </h2>

            <section className="card card__auth">
                    <ul  className="auth__btns">
                        <li className="btns__li">
                            <button className="auth__btn">Log in</button>
                        </li>
                        <li className="btns__li">
                            <button className="auth__btn">Register</button>
                        </li>
                    </ul>
                <section>
                    <form className="form form__active" onSubmit={handleLogin}>
                        <fieldset>
                            <label htmlFor="usernameLogin">Username</label>
                            <input ref={usernameLogin} type="text"
                                id="usernameLogin"
                                placeholder="Author123"
                                required autoFocus />
                        </fieldset>
                        <fieldset className="fieldset__btn">
                            <button className="btn" type="submit">Log in</button>
                        </fieldset>
                    </form>
                </section>

                <form className="form form__inactive" onSubmit={handleRegister}>
                    <fieldset>
                        <label htmlFor="usernameRegister">Username </label>
                        <input ref={usernameRegister} type="text" name="username" placeholder="Author123" required />
                    </fieldset>
                    <fieldset className="fieldset__btn">
                        <button className="btn" type="submit">Register</button>
                    </fieldset>
                </form>
            </section>

        </main>
    )
}