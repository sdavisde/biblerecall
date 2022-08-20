import React, { useState } from 'react';
import styles from '../styles/AddButton.module.scss'

export default function AddButton({...props}) {
    const [verse, setVerse] = useState({
        book: 'John',
        chapter: 3,
        verseNum: 16
    });
    
    const [verseText, setVerseText] = useState('Please select a verse');

    const retreiveVerse = async () => {
        try {
            const url = `./api/verse?book=${verse.book}&chapter=${verse.chapter}&verse=${verse.verseNum}`;
            const res = await fetch(url);
            const verse_text = await res.json().then(response => JSON.parse(response).Output);

            if (verse_text) {
                console.log(verse_text);
                setVerseText(verse_text);
            }
            else
                console.log(`Invalid Request: ${url}`);
        } catch (err) {
            console.log(err);
        }
    };
    
    const updateVerse = (e) => {
        setVerse(prev => ({...prev, [e.target.name]:e.target.value}));
    };

	return (
        <button>
            Add
        </button>
	);
}