import React, { useState } from 'react';
import styles from './VerseBox.module.scss'
import DeleteButton from '../../../components/DeleteButton';
import EditButton from '../../../components/EditButton';
import useLocalStorage from 'use-local-storage';
import Link from 'next/link';

export default function VerseBox ({ verse, remove, update, userId }) {
    const [ studyMode, setStudyMode ] = useLocalStorage("studyMode", 0);
    const [ inHoverState, setInHoverState ] = useState(false);

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
                    {studyMode === 0 &&
                        <p>
                            {verse.text}
                        </p>
                    }
                    {studyMode === 1 &&
                        <p>
                            {showFirstLetters(verse.text)}
                        </p>
                    }
                    {studyMode === 2 &&
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