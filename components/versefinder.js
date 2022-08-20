import React, { useState } from 'react';
import axios from 'axios';

const books = [
    { name: 'Genesis', value: 'Gen' },
    { name: 'Exodus', value: 'Exo' },
    { name: 'Leviticus', value: 'Lev' },
    { name: 'Numbers', value: 'Num' },
    { name: 'Deuteronomy', value: 'Deu' },
    { name: 'Joshua', value: 'Jos' },
    { name: 'Judges', value: 'Jud' },
    { name: 'Ruth', value: 'Rut' },
    { name: '1 Samuel', value: '1 Sa' },
    { name: '2 Samuel', value: '2 Sa' },
    { name: '1 Kings', value: '1 Ki' },
    { name: '2 Kings', value: '2 Ki' },
    { name: '1 Chronicles', value: '1 Ch' },
    { name: 'Ezra', value: 'Ezr' },
    { name: 'Nehemiah', value: 'Neh' },
    { name: 'Esther', value: 'Est' },
    { name: 'Job', value: 'Job' },
    { name: 'Psalm', value: 'Psa' },
    { name: 'Proverbs', value: 'Pro' },
    { name: 'Ecclesiastes', value: 'Ecc' },
    { name: 'Songs of Soloman', value: 'Son' },
    { name: 'Isaiah', value: 'Isa' },
    { name: 'Jeremiah', value: 'Jer' },
    { name: 'Lamentations', value: 'Lam' },
    { name: 'Ezekiel', value: 'Eze' },
    { name: 'Daniel', value: 'Dan' },
    { name: 'Hosea', value: 'Hos' },
    { name: 'Joel', value: 'Joe' },
    { name: 'Amos', value: 'Amo' },
    { name: 'Obadiah', value: 'Oba' },
    { name: 'Jonah', value: 'Jon' },
    { name: 'Micah', value: 'Mic' },
    { name: 'Nahum', value: 'Nahum' },
    { name: 'Habakkuk', value: 'Hab' },
    { name: 'Zephaniah', value: 'Zep' },
    { name: 'Haggai', value: 'Hag' },
    { name: 'Zechariah', value: 'Zec' },
    { name: 'Malachi', value: 'Mal' },
    { name: 'Matthew', value: 'Mat' },
    { name: 'Mark', value: 'Mar' },
    { name: 'Luke', value: 'Luk' },
    { name: 'John', value: 'Joh' },
    { name: 'Acts', value: 'Act' },
    { name: 'Romans', value: 'Rom' },
    { name: '1 Corinthians', value: '1Co' },
    { name: '2 Corinthians', value: '2Co' },
    { name: 'Galatians', value: 'Gal' },
    { name: 'Ephesians', value: 'Eph' },
    { name: 'Philipians', value: 'Phi' },
    { name: 'Colossians', value: 'Col' },
    { name: '1 Thessalonians', value: '1Th' },
    { name: '2 Thessalonians', value: '2Th' },
    { name: '1 Timothy', value: '1Ti' },
    { name: '2 Timothy', value: '2Ti' },
    { name: 'Titus', value: 'Tit' },
    { name: 'Philemon', value: 'Phi' },
    { name: 'Hebrews', value: 'Heb' },
    { name: 'James', value: 'Jam' },
    { name: '1 Peter', value: '1Pe' },
    { name: '2 Peter', value: '2Pe' },
    { name: '1 John', value: '1Jo' },
    { name: '2 John', value: '2Jo' },
    { name: '3 John', value: '3Jo' },
    { name: 'Jude', value: 'Jud' },
    { name: 'Revelations', value: 'Rev' },
]

// TODO: This might be a more effective method of retrieving books that won't take so much time to refactor.
// TODO: make a function that reads this json into a list of books, like above.
const books_alt = axios('./api/books')
    .then(response => {
        response.data;
    })
    .catch(error => {
        console.log(error);
    })

export default function VerseFinder(props) {
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
        <>
            <div className="form_wrapper">
                <select name="book" onChange={updateVerse} defaultValue={verse.book}>
                    {books.map((book, index) =>
                        <option name="lang" key={index} value={book.name} defaultValue={verse.book == book.name}> 
                            {book.name}
                        </option>
                    )}
                </select>
                <input name="chapter" type="textbox" onChange={updateVerse} defaultValue={verse.chapter}/>
                <input name="verseNum" type="textbox" onChange={updateVerse} defaultValue={verse.verseNum}/>
                <button onClick={() => retreiveVerse()}>Find Verse</button>
            </div>
            <div className="results">
                <h5>{verseText}</h5>
            </div>
        </>
	);
}