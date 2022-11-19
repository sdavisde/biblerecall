'use client';

import { useSettings } from './SettingsContext';
import icon from '../../assets/menu.png';
import Image from 'next/image';
import styles from './Menu.module.scss';
import { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";

function SaveSettings(userId, theme, study_mode) {
    fetch(`/api/save_settings?userId=${userId}&theme=${theme}&study_mode=${study_mode}`);
}

/* 
 * session.user has name, email, and image attributes
*/

export default function Menu() {
    const { data: session, status } = useSession();
    const { settings, setSettings } = useSettings();

    const [ menuOpen, setMenuOpen ] = useState(false);

    useEffect(() => {
        if (document.body.dataset.theme != settings.theme) {
            console.log(`setting doc body to: ${settings.theme}`)
            document.body.dataset.theme = settings.theme
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
        const new_mode = (settings?.study_mode + 1) % 4;
        SaveSettings(session?.id, settings.theme, new_mode);
        setSettings(prev => ({...prev, study_mode: new_mode}));
    }

    let themeChange = () => {
        const new_mode = settings?.theme == 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = new_mode;
        SaveSettings(session?.id, new_mode, settings.study_mode);
        setSettings(prev => ({...prev, theme: new_mode}));
    }

    return (
        <>
            <div className={styles.container}>
                <Image src={icon} width={50} height={50} onClick={() => setMenuOpen(!menuOpen)} className={styles.icon} alt='menu'/>
                {menuOpen &&
                <div className={styles.menu}>
                    <div className={styles.menuSection} onClick={() => themeChange()}>
                        <div className={styles.studyTitle} >
                            Color Mode:
                        </div>
                        <p className={styles.studyMode}>{settings?.theme}</p>
                    </div>
                    <div className={styles.menuSection} onClick={() => studyPress()}>
                        <div className={styles.studyTitle}>
                            Study Mode: 
                        </div>
                        <p className={styles.studyMode}>{settings?.study_mode}</p>
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