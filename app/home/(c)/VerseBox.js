import React, { useState } from 'react';
import styles from './VerseBox.module.scss'
import DeleteButton from '../../../components/DeleteButton';
import EditButton from '../../../components/EditButton';
import { useSettings } from '../../(c)/SettingsContext';
import Link from 'next/link';

export default function VerseBox ({ verse, remove, update, userId }) {
    const { settings, setSettings } = useSettings();
    const [inHoverState, setInHoverState] = useState(false);

    let showFirstLetters = (text) => {
        const words = text.split(' ');

        for (var i = 0; i < words.length; i++) {
            const letter = words[i][0];
            const rest = words[i].substring(1).replace(/./g, '*');
            words[i] = letter + rest;
        }
        
        return words.join(' ');
    }

    let showStars = (text) => {
        const stars = text?.replace(/[0-9a-z]/gi, '*');
        return stars;
    }

    return (
        <div className={styles.box} 
            onMouseEnter={() => setInHoverState(true)}
            onMouseLeave={() => setInHoverState(false)}
        >
            <Link href={`/game/${userId}/${verse.id}`} className={styles.anchor}>
                <div className={styles.leftSection}>
                    <h2>
                        {verse.book} {verse.chapter} : {verse.verse} <br/>
                    </h2>
                    {settings?.study_mode === 0 &&
                        <p>
                            {verse.text}
                        </p>
                    }
                    {settings?.study_mode === 1 &&
                        <p>
                            {showFirstLetters(verse.text)}
                        </p>
                    }
                    {settings?.study_mode === 2 &&
                        <p>
                            {showStars(verse.text)}
                        </p>
                    }
                    {/* else it won't show any text */}
                </div>
            </Link>
            
            {
                inHoverState
                &&
                <div className={styles.hoverIcons}>
                    {/* <EditButton onClick={(e) => update(verse.id, e)}/>                     */}
                    <DeleteButton onClick={(e) => remove(verse.id, e)}/>
                </div>
            }
        </div>
	);
}