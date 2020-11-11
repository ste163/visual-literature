// Change CSS property values on the :root for light & dark mode
export const HeaderColorMode = () => {
    const root = document.documentElement.style
    const colorMode = sessionStorage.getItem('colorMode')

    if (colorMode !== 'dark') {
        root.setProperty('--fontColor', '#333333')
        root.setProperty('--offWhite', '#FCFCFC')
        root.setProperty('--black', 'rgb(7, 7, 7)')
        root.setProperty('--lightBlack', '#171717ff')
        root.setProperty('--lightGray', '#F6F6F6')
        root.setProperty('--mintBlue', '#c3e8e5ff')
        root.setProperty('--mediumGray', '#f1f1f1')
        root.setProperty('--inactiveFormField', 'rgb(246, 246, 246)')
        root.setProperty('--fontColorInactive', '#cacaca')
        root.setProperty('--fontColorBtn', '#FCFCFC')
        root.setProperty('--progressBar', '#171717ff')
        root.setProperty('--progressBarBackground', '#FCFCFC')
    } else if (colorMode === 'dark') {
        root.setProperty('--fontColor', 'white')
        root.setProperty('--offWhite', '#1e1e1e')
        root.setProperty('--black', 'rgb(195, 195, 195)')
        root.setProperty('--lightBlack', 'white')
        root.setProperty('--lightGray', '#2c2b2b')
        root.setProperty('--mintBlue', '#363636')
        root.setProperty('--mediumGray', '#2d2c2c')
        root.setProperty('--inactiveFormField', 'rgb(35, 35, 35)')
        root.setProperty('--fontColorInactive', '#4a4a4a')
        root.setProperty('--fontColorBtn', '#333333')
        root.setProperty('--progressBar', '#76cdc7ff')
        root.setProperty('--progressBarBackground', '#484848')
    }
}