import React, { useEffect, useState } from "react"

export const HeaderColorMode = () => {
    const root = document.documentElement.style
    const colorMode = sessionStorage.getItem("colorMode")

    if (colorMode === "light") {
        root.setProperty("--offWhite", '#FCFCFC')
    } else if (colorMode === "dark") {
        root.setProperty("--offWhite", 'red')
    }
}