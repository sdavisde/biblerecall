import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import React, { useState } from 'react';
import styles from '../styles/VerseBox.module.scss'
import DeleteButton from './DeleteButton';
import EditButton from './EditButton'
import ViewButton from './ViewButton';

export default function VerseBox ({ verse, remove, view }) {
    const [deleteBtnVisible, setDeleteBtnVisible] = useState(false);

    return (
        <div className={styles.box} 
            onMouseEnter={() => setDeleteBtnVisible(true)}
            onMouseLeave={() => setDeleteBtnVisible(false)}
            onClick={view}
        >
            <div className={styles.leftSection}>
                <h1>
                    {verse.book} {verse.chapter} : {verse.verse} <br/>
                </h1>
                <h3>
                    {verse.text}
                </h3>
            </div>
            <div className={styles.rightSection}>
                {
                    deleteBtnVisible
                        &&
                    <DeleteButton onClick={(e) => {remove(verse.id, e);}}/>
                }
                <EditButton />
            </div>
        </div>
	);
}