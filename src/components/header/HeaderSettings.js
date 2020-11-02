import React from "react"

export const HeaderSettings = () => {

    return (
        <>
            <h2 className="modal__h2">Settings</h2>
            Set default landing page
            Set default project
            Dark mode
            Delete Account
            <button className="btn"
            onClick={e => e.currentTarget.parentElement.parentElement.parentElement.className = "background__modal"}>Close</button>
        </>
    )
}