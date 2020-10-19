import React, { useState, createContext } from "react"

export const TypeContext = createContext()

export const TypeProvider = props => {

    const [ types, setType ] = useState([])

    const getTypes = () => {
        return fetch(`http://localhost:8088/types`)
        .then(response => response.json())
        .then(setType)
    }

    return (
        <TypeContext.Provider value={{
            types, getTypes
        }}>
            {props.children}
        </TypeContext.Provider>
    )
}