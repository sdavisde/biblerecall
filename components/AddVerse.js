import styles from '../styles/AddVerse.module.scss';
import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { GetBooks, GetChapters, GetVerses, AddNewVerse } from '../middleware/verse';

export default function AddVerse({ formSubmitted, books }) {
    const [bookId, setBookId] = useState(1);
    const [chapters, setChapters] = useState([]);
    const [verseList, setVerseList] = useState([]);
    const [verse, setVerse] = useState({
        book: '',
        chapterId: null,
        verseId: null,
        text: '',
        group: 'Group_2'
    });
    const [chapterSelectDisabled, setChapterSelectDisabled] = useState(true);
    const [verseSelectDisabled, setVerseSelectDisabled] = useState(true);

    let addVerse = (event) => {
        event.preventDefault();
        if (verse.book != '' && verse.chapterId && verse.verseId && verse.text != '') {
            AddNewVerse(verse)
                .then((data) => {
                    formSubmitted();
                })
        }
    };

    let setVerseText = (verseId) => {
        if (!verseId) {
            setVerse({
                ...verse,
                verseId: null,
                text: ''
            });
            return;
        }

        const target = verseList.find((v) => v.verseId == verseId);
        if (target) {
            setVerse(prev => ({
                ...prev,
                verseId: target.verseId,
                text: target.verse
            }));
        }
    }

    let bookSelected = (id, bookName) => {
        GetChapters(id).then((data) => {
            setChapters(data)
        });
        setVerse(prev => ({...prev, book: bookName }));
    }

    let chapterSelected = (book_id, chapter_id) => {
        GetVerses(book_id, chapter_id).then((data) => {
            setVerseList(data)
        });
        setVerse(prev => ({...prev, chapterId: chapter_id }));
    }

    let onChange = (e) => {
        // Update the verse object with each field that changes
        setVerse(prev => ({...prev, [e.target.name]:e.target.value}));

        switch (e.target.name) {
            case 'book':
                let book = books.find(book => book.name === e.target.value);
                let bookName = e.target.value;
                if (book) {
                    setBookId(book.id);
                    bookSelected(book.id, bookName);
                    setChapterSelectDisabled(false);
                }
                else {
                    setChapterSelectDisabled(true);
                    setVerseSelectDisabled(true);
                }
                break;
            case 'chapter':
                let chapter = chapters.find(chapter => chapter.id === parseInt(e.target.value));
                if (chapter) {
                    chapterSelected(bookId, e.target.value);
                    setVerseSelectDisabled(false);
                } else {
                    setVerseSelectDisabled(true);
                }
                break;
            case 'verse':
                if (e.target.value) {
                    let verseId = parseInt(e.target.value);
                    setVerseText(verseId);
                }
                else {
                    setVerseText();
                }
                break;
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.Heading}>New Verse</h1>
            <div className={styles.row}>
                <input name="book" onChange={onChange} placeholder="Enter Book Name" list="books" className={styles.book}/>
                <datalist id="books">
                    {books.map((book, key) =>
                        <option key={key} id={book.id}>{book.name}</option>
                    )}
                </datalist>
                <select name="chapter" onChange={onChange} defaultValue={verse.chapter} className={styles.numList} disabled={chapterSelectDisabled}>
                    <option value=''>#</option>
                    {chapters.map((chapter, key) =>
                        <option key={key}>{chapter.id}</option>
                    )}
                </select>
                <span className={styles.colon}>:</span>
                <select name="verse" onChange={onChange} defaultValue={verse.verse} className={styles.numList} disabled={verseSelectDisabled}>
                    <option value=''>#</option>
                    {verseList.map((verse, key) =>
                        <option key={key}>{verse.verseId}</option>
                    )}
                </select>
            </div>
            <div className={styles.row}>
                <TextareaAutosize name="text" 
                    placeholder='Verse Text' 
                    value={verse.text} 
                    spellCheck="false"
                    className={styles.verseText}/>
            </div>
            <button onClick={addVerse} className={styles.addBtn}>Add Verse</button>
        </div>
	);
}