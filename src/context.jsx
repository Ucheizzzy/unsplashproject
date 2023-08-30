import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext()

//check for the initial mode of the browser
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true'

  return storedDarkMode || prefersDarkMode
}

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkThem] = useState(getInitialDarkMode())
  const [searchTerm, setSearchTerm] = useState('dog')

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setIsDarkThem(newDarkTheme)
    localStorage.setItem('darkTheme', newDarkTheme)
  }
  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme)
  }, [isDarkTheme])

  return (
    <AppContext.Provider
      value={{ toggleDarkTheme, isDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)
