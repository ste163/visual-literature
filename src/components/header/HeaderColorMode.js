import React, { useEffect, useState } from "react"

export const HeaderColorMode = () => {
    const root = document.documentElement.style
    const colorMode = sessionStorage.getItem("colorMode")

    if (colorMode === "light") {
        root.setProperty("--fontColor", "#333333")
        root.setProperty("--offWhite", '#FCFCFC')
        root.setProperty("--lightGray", "#F6F6F6")
        root.setProperty("--mintBlue", "#c3e8e5ff")
        root.setProperty("--mediumGray", "#f1f1f1")
    } else if (colorMode === "dark") {
        root.setProperty("--fontColor", "white")
        root.setProperty("--offWhite", '#1e1e1e')
        root.setProperty("--lightGray", "#2c2b2b")
        root.setProperty("--mintBlue", "#363636")
        root.setProperty("--mediumGray", "#2d2c2c")
    }
}