import Image from 'next/image';
import { useState } from 'react';
import styles from './StationaryPill.module.scss';

export default function StationaryPill ({ showNewVerse, showNewCustom }) {
    const [displayOptions, setDisplayOptions] = useState(false);

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