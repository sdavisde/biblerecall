import styles from '../styles/AddVerse.module.scss';
import React, { useState, useEffect } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { GetGroups, GetBooks, GetChapters, GetVerses, AddNewVerse } from '../middleware/verse';

export default function AddVerse({ formSubmitted }) {
    const [groups, setGroups] = useState([]);
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState(1);
    const [chapters, setChapters] = useState([]);
    const [verseList, setVerseList] = useState([]);
    const [verse, setVerse] = useState({
        book: 'Genesis',
        chapterId: 1,
        verseId: 1,
        text: '',
        group: 'Group_2'
    });

    useEffect(() => {
        // GetGroups()
        //     .then((data) => {
        //         setGroups(data);
        //         setVerse(prev => ({...prev, group: data[0].groupName ?? ''}));
        //     });
        
        GetBooks()
            .then((data) => {
                setBooks(data);
            })
    }, [])

    let addVerse = (event) => {
        console.log(verse);
        event.preventDefault();
        AddNewVerse(verse)
            .then((data) => {
                formSubmitted();
            });
    };

    let setVerseText = (verseId) => {
        const target = verseList.find((v) => v.verseId == verseId);
        setVerse(prev => ({...prev, verseId: target.verseId, text: target.verse }));
    }

    let bookSelected = (id) => {
        GetChapters(id).then((data) => {
            setChapters(data)
        });
        setVerse(prev => ({...prev, chapterId: 1, verseId: 1 }));
    }

    let chapterSelected = (book_id, chapter_id) => {
        GetVerses(book_id, chapter_id).then((data) => {
            setVerseList(data)
        });
        setVerse(prev => ({...prev, chapterId: chapter_id, verseId: 1 }));
    }

    let onChange = (e) => {
        // Update the verse object with each field that changes
        setVerse(prev => ({...prev, [e.target.name]:e.target.value}));

        switch (e.target.name) {
            case 'book':
                let book = books.find(book => book.name === e.target.value);
                if (book) {
                    setBookId(book.id);
                    bookSelected(book.id);
                }
                break;
            case 'chapter':
                let chapter = chapters.find(chapter => chapter.id === parseInt(e.target.value));
                if (chapter) {
                    chapterSelected(bookId, e.target.value);
                    break;
                }
            case 'verse':
                let verseId = parseInt(e.target.value);
                setVerseText(verseId);
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
                <select name="chapter" onChange={onChange} defaultValue={verse.chapter} className={styles.numList}>
                    {chapters.map((chapter, key) =>
                        <option key={key}>{chapter.id}</option>
                    )}
                </select>
                <span className={styles.colon}>:</span>
                <select name="verse" onChange={onChange} defaultValue={verse.verse} className={styles.numList}>
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
                    onChange={(e) => {
                        e.target.style.height = 0;
                        e.target.style.height = (e.target.scrollHeight) + "px";
                    }} 
                    className={styles.verseText}/>
            </div>
            <button onClick={addVerse} className={styles.addBtn}>Add Verse</button>
        </div>
	);
}