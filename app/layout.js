'use client';

import Navbar from './(c)/NavBar';
import AuthContext from './(c)/AuthContext';
import useLocalStorage from 'use-local-storage';
import './globals.scss'

export default function RootLayout({ children }) {
    const [theme, setTheme] = useLocalStorage('theme', 'light');

    return (
        <html>
            <head>
                <title>Bible Recall</title>
                <meta name="description" content="Come Memorize Some More Scripture!"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/bible.png" />
            </head>
            <body data-theme={theme}>
                <AuthContext>
                        <Navbar />
                        <div className='pageContainer'>
                            {children}
                        </div>
                </AuthContext>
            </body>
        </html>
    )
}
