import React from "react"

export const NoDefaultCard = () => {
    const defaultProject = +sessionStorage.getItem("defaultProject")

    return (
        <section className="card card__color--white card__noDefault">
            <h2 className="noDefault__h2">No project selected</h2>
            <p className="noDefault__p">Select a <strong>project</strong> from the <strong>drop-down menu</strong>{defaultProject !== 0 ? null : (<> or set a <strong>default project</strong> from the <strong>settings menu</strong></>)}.</p>
        </section>
    )
}

