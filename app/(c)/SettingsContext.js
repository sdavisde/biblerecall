import React, { useContext, useState } from 'react'

export const settings = {
    default: {
        study_mode: 0
    }
}

export const SettingsContext = React.createContext({
    settings: undefined,
    setSettings: async (settings) => null,
})

export const useSettings = () => useContext(SettingsContext)

/*
 * Define new menu items here to instantiate them into context
*/
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        study_mode: 0
    })

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}