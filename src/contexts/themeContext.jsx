import { useTheme } from "next-themes";
import { createContext, useEffect } from "react";

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
    const localTheme = localStorage.getItem('theme')
    const { theme, setTheme } = useTheme(localTheme || 'dark')
    
    useEffect(() => {

        localStorage.setItem('theme', theme)

    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeProvider, ThemeContext }