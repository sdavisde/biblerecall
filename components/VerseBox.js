import React, { useState } from 'react';
import styles from '../styles/VerseBox.module.scss'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import Link from 'next/link';

export default function VerseBox ({ verse, remove, update }) {
    const [inHoverState, setInHoverState] = useState(false);

    return (
        <div className={styles.box} 
            onMouseEnter={() => setInHoverState(true)}
            onMouseLeave={() => setInHoverState(false)}
        >
            <Link href={`/verseGame/${verse.id}`}>
                <a className={styles.anchor}>
                    <div className={styles.leftSection}>
                        <h2>
                            {verse.book} {verse.chapter} : {verse.verse} <br/>
                        </h2>
                        <p>
                            {verse.text}
                        </p>
                    </div>
                </a>
            </Link>
            
            {
                inHoverState
                &&
                <div className={styles.hoverIcons}>
                    <EditButton onClick={(e) => update(verse.id, e)}/>                    
                    <DeleteButton onClick={(e) => remove(verse.id, e)}/>
                </div>
            }
        </div>
	);
}