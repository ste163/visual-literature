import React, { useRef } from "react"
import { useHistory } from "react-router-dom";

export const AuthView = props => {

    const usernameLogin = useRef()
    const usernameRegister = useRef()
    const existDialog = useRef()
    const conflictDialog = useRef()
    const history = useHistory()

    const existingUserCheckLogin = () => {
        return fetch(`http://localhost:8088/users?username=${usernameLogin.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

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
        <main>
            <dialog ref={existDialog}>
                <div>User does not exist</div>
                <button onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <dialog ref={conflictDialog}>
                <div>Account with that username already exists</div>
                <button onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Write Log</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="usernameLogin"> Username </label>
                        <input ref={usernameLogin} type="text"
                            id="usernameLogin"
                            placeholder="username"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">Sign in</button>
                    </fieldset>
                </form>
            </section>

            <form onSubmit={handleRegister}>
                <h1>Please Register for Write Log</h1>
                <fieldset>
                    <label htmlFor="usernameRegister"> Username </label>
                    <input ref={usernameRegister} type="text" name="username" placeholder="username" required />
                </fieldset>
                <fieldset>
                    <button type="submit">Register</button>
                </fieldset>
            </form>

        </main>
    )
}