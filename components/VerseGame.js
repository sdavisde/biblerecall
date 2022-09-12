import styles from '../styles/VerseGame.module.scss';
import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function VerseGame({ verse }) {

    let onChange = (e) => {
        // Check that the keystroke is correct for that word
        // Highlight the word red or black depending on if it's correct
        // Move to the next word
    };

    return (
        <div className={styles.container}>
            <h1>{verse.book} {verse.chapter}:{verse.verse}</h1>
            <TextareaAutosize name="text" 
                    placeholder='Verse Text'
                    value={verse.text} 
                    spellCheck="false"
                    className={styles.verseText}/>
        </div>
	);
}