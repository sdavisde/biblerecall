import React, { useState } from 'react';
import styles from '../styles/VerseBox.module.scss'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton'
import ViewButton from './ViewButton';

export default function VerseBox ({ verse, remove }) {
    const [deleteBtnVisible, setDeleteBtnVisible] = useState(false);

    return (
        <div className={styles.box} 
            onMouseEnter={() => setDeleteBtnVisible(true)}
            onMouseLeave={() => setDeleteBtnVisible(false)}
        >
            <div className={styles.leftSection}>
                <h1>
                    {verse.book} {verse.chapter} : {verse.verse} <br/>
                </h1>
                <h4>
                    {verse.text}
                </h4>
            </div>
            <div className={styles.rightSection}>
                {
                    deleteBtnVisible
                        &&
                    <DeleteButton onClick={() => remove(verse.id)}/>
                }
                <EditButton />
            </div>
        </div>
	);
}