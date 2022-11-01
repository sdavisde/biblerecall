'use client';

import Navbar from './NavBar';
import AuthContext from './AuthContext';
import styles from './layout.module.scss';

export default function RootLayout({ children }) {
    return (
        <html>
            <head>
                <title>Bible Recall</title>
                <meta name="description" content="Come Memorize Some More Scripture!"/>
                <link rel="icon" href="/bible.png" />
            </head>
            <body className={styles.light}>
                <AuthContext>
                    <Navbar />
                    {children}
                </AuthContext>
            </body>
        </html>
    )
}
