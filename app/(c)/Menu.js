'use client';

import useLocalStorage from 'use-local-storage';
import styles from './Menu.module.scss';
import { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";

function SaveUserSettings(userId, theme, study_mode) {
    fetch(`/api/save_settings?userId=${userId}&theme=${theme}&study_mode=${study_mode}`);
}

/* 
 * session.user has name, email, and image attributes
*/

export default function Menu() {
    const { data: session, status } = useSession();
    const [ theme, setTheme ] = useLocalStorage("theme", "light");
    const [ studyMode, setStudyMode ] = useLocalStorage("studyMode", 0);
    const [ menuOpen, setMenuOpen ] = useState(false);

    useEffect(() => {
        if (document.body.dataset.theme != theme) {
            console.log(`setting doc body to: ${theme}`)
            document.body.dataset.theme = theme;
        }

        // Menu open / close logic
        const closeMenu = (e) => {
            if (!e.srcElement.className.includes('Menu')) {
                setMenuOpen(false);
            }
        };
        document.body.addEventListener('click', closeMenu);
        return () => document.body.removeEventListener('click', closeMenu);
    }, [])

    let studyPress = () => {
        const new_mode = (studyMode + 1) % 4;
        SaveUserSettings(session?.id, theme, new_mode);
        setStudyMode(new_mode);
    }

    let themeChange = () => {
        const new_mode = theme == 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = new_mode;
        SaveUserSettings(session?.id, new_mode, studyMode);
        setTheme(new_mode);
    }

    return (
        <>
            <div className={styles.container}>
                <div height={50} onClick={() => setMenuOpen(!menuOpen)} className={styles.icon}>
                    <div/>
                    <div/>
                    <div/>
                </div>
                {menuOpen &&
                <div className={styles.menu}>
                    <div className={styles.menuSection} onClick={() => themeChange()}>
                        <div className={styles.studyTitle} >
                            Color Mode:
                        </div>
                        <p className={styles.studyMode}>{theme}</p>
                    </div>
                    <div className={styles.menuSection} onClick={() => studyPress()}>
                        <div className={styles.studyTitle}>
                            Study Mode: 
                        </div>
                        <p className={styles.studyMode}>{studyMode}</p>
                    </div>
                    <div className={styles.menuSection} onClick={() => signOut({ callbackUrl: '/' })}>
                        <div className={styles.logOut} >
                            Sign out
                        </div>
                    </div>
                </div>
                }
            </div>
        </>
    )
}