'use client';

import Navbar from './(c)/NavBar';
import AuthContext from './(c)/AuthContext';
import { SettingsProvider } from './(c)/SettingsContext';
import styles from './layout.module.scss';

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <title>Bible Recall</title>
                <meta name="description" content="Come Memorize Some More Scripture!"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/bible.png" />
            </head>
            <body className={styles.light}>
                <AuthContext>
                    <SettingsProvider>
                        <Navbar />
                        <div className={styles.pageContainer}>
                            {children}
                        </div>
                    </SettingsProvider>
                </AuthContext>
            </body>
        </html>
    )
}
