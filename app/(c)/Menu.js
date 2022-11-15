'use client';

import { useSettings } from './SettingsContext';
import icon from '../../assets/menu.png';
import Image from 'next/image';
import styles from './Menu.module.scss';
import { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";

/* 
 * session.user has name, email, and image attributes
*/

export default function Menu() {
    const { data: session, status } = useSession();
    const { settings, setSettings } = useSettings();

    const [ menuOpen, setMenuOpen ] = useState(false);
    const [ studyMode, setStudyMode ] = useState(0);

    useEffect(() => {
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
        setSettings(prev => ({...prev, study_mode: new_mode}));
        setStudyMode(new_mode);
    }

    return (
        <>
            <div className={styles.container}>
                <Image src={icon} width={50} height={50} onClick={() => setMenuOpen(!menuOpen)} className={styles.icon} alt='menu'/>
                {menuOpen &&
                <div className={styles.menu}>
                    <button className={styles.study} onClick={() => studyPress()}>
                        Study Mode: {studyMode}
                    </button>
                    <button className={styles.logOut} onClick={() => signOut({ callbackUrl: '/' })}>
                        Sign out
                    </button>
                </div>
                }
            </div>
        </>
    )
}