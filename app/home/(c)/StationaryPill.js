import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './StationaryPill.module.scss';

export default function StationaryPill ({ showNewVerse, showNewCustom }) {
    const [displayOptions, setDisplayOptions] = useState(false);

    useEffect(() => {
        const closeMenu = (e) => {
            if (!e.srcElement.className.includes('StationaryPill'))
                setDisplayOptions(false);
        };

        document.body.addEventListener('click', closeMenu);
        return () => document.body.removeEventListener('click', closeMenu);
    }, [])

    return (
        <div className={styles.container}>
            {displayOptions ?
                <div className={styles.vanishingBox}>
                    <button className={styles.pill} onClick={() => {setDisplayOptions(false); showNewVerse()}}>New Verse</button>
                    <button className={styles.pill} onClick={() => {setDisplayOptions(false); showNewCustom()}}>Add Custom Verse</button>
                </div>
            :
                <>
                </>
            }

            <button className={styles.pill} onClick={() => setDisplayOptions(!displayOptions)}>
                Add New Verses
            </button>
        </div>
    );
}