import styles from './NewVerse.module.scss';
import React, { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { GetChapters, GetVerses } from '../../../middleware/verse';

export default function NewVerse({ addVerse, books }) {
    const bookInput = useRef(null);
    const verse2 = useRef(null);
    const [bookId, setBookId] = useState(1);
    const [chapters, setChapters] = useState([]);
    const [verseList, setVerseList] = useState([]);
    const [verse, setVerse] = useState({
        book: '',
        chapterId: null,
        verseId: null,
        verseId2: null,
        text: '',
        group: ''
    });
    const [chapterSelectDisabled, setChapterSelectDisabled] = useState(true);
    const [verseSelectDisabled, setVerseSelectDisabled] = useState(true);
    
    let clearForm = () => {
        bookInput.current.value = '';
        setBookId(1);
        setChapters([]);
        setVerseList([]);
        setVerse({
            book: '',
            chapterId: null,
            verseId: null,
            verseId2: null,
            text: '',
            group: ''
        })
        setChapterSelectDisabled(true);
        setVerseSelectDisabled(true);
        setVerseText();
    };

    let formSubmitted = (event) => {
        event.preventDefault();
        if (verse.book != '' && verse.chapterId && verse.verseId && verse.text != '') {
            clearForm();
            addVerse(verse);
        }
    };

    let setVerseText = (start, end) => {
        if (!start) {
            setVerse({
                ...verse,
                verseId: null,
                text: ''
            });
            return;
        }

        if (end) {
            let verseText = '';
            const verseIds = `${start} - ${end}`;

            verseList.forEach (v => {
                if (v.verseId >= start && v.verseId <= end) {
                    verseText += `${v.verse}` + ' ';
                }
            })

            verseText = verseText.substring(0, verseText.length-1);

            if (verseText) {
                setVerse(prev => ({
                    ...prev,
                    verseId: verseIds,
                    text: verseText
                }));
            }
        } else {
            const target = verseList.find((v) => v.verseId == start);

            if (target) {
                setVerse(prev => ({
                    ...prev,
                    verseId: target.verseId,
                    text: target.verse
                }));
            }
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
                let book = books?.find(book => book.name === e.target.value);
                let bookName = e.target.value;
                if (book) {
                    setBookId(book.id);
                    bookSelected(book.id, bookName);
                    setChapterSelectDisabled(false);
                }
                else {
                    setChapterSelectDisabled(true);
                    setVerseSelectDisabled(true);
                    setVerseText();
                }
                break;
            case 'chapter':
                let chapter = chapters.find(chapter => chapter.id === parseInt(e.target.value));
                if (chapter) {
                    chapterSelected(bookId, e.target.value);
                    setVerseSelectDisabled(false);
                } else {
                    setVerseSelectDisabled(true);
                    setVerseText();
                }
                break;
            case 'verse':
                if (e.target.value) {
                    const start = parseInt(e.target.value);
                    setVerseText(start);
                    verse2.current.value = `${start}`;
                }
                else {
                    setVerseText();
                }
                break;
            case 'verse_2':
                if (e.target.value) {
                    const start = verse.verseId;
                    const end = parseInt(e.target.value);
                    setVerseText(start, end);
                }
                else {
                    setVerseText();
                }
                break;
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.Heading}>New Verse</h2>
            <div className={styles.row}>
                <input name="book" onChange={onChange} placeholder="Enter Book" list="books" className={styles.book} ref={bookInput}/>
                <datalist id="books">
                    {books?.map((book, key) =>
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
                <select name="verse" onChange={onChange} className={styles.numList} disabled={verseSelectDisabled}>
                    <option value=''>#</option>
                    {verseList.map((verse, key) =>
                        <option key={key}>{verse.verseId}</option>
                    )}
                </select>
                <select name="verse_2" onChange={onChange} className={styles.numList} disabled={verseSelectDisabled} ref={verse2}>
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
            <button onClick={formSubmitted} className={styles.addBtn}>Add Verse</button>
        </div>
	);
}