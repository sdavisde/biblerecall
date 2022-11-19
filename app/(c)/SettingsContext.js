import React, { useContext, useState } from 'react'

export const settings = {
    default: {
        study_mode: 0,
        theme: 'light'
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
        study_mode: 0,
        theme: 'light'
    })

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function SettingsWrapper({ children }) {

    return (        
        <div data-theme={settings?.theme}>
            {children}
        </div>
    )
}