import React, { useState } from 'react';
import styles from './VerseBox.module.scss'
import DeleteButton from '../../../components/DeleteButton';
import EditButton from '../../../components/EditButton';
import Link from 'next/link';

export default function VerseBox ({ verse, remove, update, userId }) {
    const [inHoverState, setInHoverState] = useState(false);

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
                    <p>
                        {verse.text}
                    </p>
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