import styles from '../../styles/VerseGame.module.scss';
import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { GetVerseIds, GetVerseData } from '../../db_access/pageData';

export default function VerseGame({ verseData }) {

    let onChange = (e) => {
        // Check that the keystroke is correct for that word
        // Highlight the word red or black depending on if it's correct
        // Move to the next word
    };

    return (
        <div className={styles.container}>
            <h1>{verseData.book} {verseData.chapter}:{verseData.verse}</h1>
            <TextareaAutosize name="text" 
                    placeholder='Verse Text'
                    value={verseData.text} 
                    spellCheck="false"
                    className={styles.verseText}/>
        </div>
	);
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    let paths = GetVerseIds().then((paths) => {
        return {
            paths,
            fallback: false,
        };
    });

    return paths;
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the verse game using params.id
    let propsList = GetVerseData(params.id).then((verseData) => {

        console.log(`verse data: ${verseData}`);

        return {
            props: {
                verseData
            }
        };
    });

    return propsList;
}