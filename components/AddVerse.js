import styles from '../styles/AddVerse.module.scss';
import React, { useState, useEffect } from 'react';
import { GetGroups, GetBooks, GetChapters, GetVerses, AddNewVerse } from '../middleware/verse';

export default function AddVerse({ formSubmitted }) {
    const [groups, setGroups] = useState([]);
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState(1);
    const [chapters, setChapters] = useState([]);
    const [verseList, setVerseList] = useState([]);
    const [verse, setVerse] = useState({
        book: 'Genesis',
        chapter: 1,
        verse: 1,
        text: '',
        group: ''
    });

    useEffect(() => {
        GetGroups()
            .then((data) => {
                setGroups(data);
                setVerse(prev => ({...prev, group: data[0].groupName ?? ''}));
            });
        
        GetBooks()
            .then((data) => {
                console.log(data);
                setBooks(data);
                bookSelected(1); // Defaulting to Genesis
                chapterSelected(1, 1); // Defaulting to chapter 1
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

    let setVerseText = () => {
        fetch(`/api/retrieve_verseText`)
    }

    let bookSelected = (id) => {
        GetChapters(id).then((data) => {
            setChapters(data)
        });
        setVerse(prev => ({...prev, chapter: 1, verse: 1 }));
    }

    let chapterSelected = (book_id, chapter_id) => {
        GetVerses(book_id, chapter_id).then((data) => {
            setVerseList(data)
        });
        setVerse(prev => ({...prev, verse: 1 }));
    }

    let onChange = (e) => {

        // Update the verse object with each field that changes
        setVerse(prev => ({...prev, [e.target.name]:e.target.value}));

        switch (e.target.name) {
            case 'book':
                let book = books.find(book => book.name === e.target.value);
                if (book) {
                    console.log(`Book does exist: ${book.name} - ${e.target.value}`);
                    setBookId(book.id);
                    bookSelected(book.id);
                } else {
                    console.log('Book does not exist');
                }
                break;
            case 'chapter':
                if (chapters.includes(e.target.value)) {
                    console.log(`chapter exists: ${e.target.value}`);
                    chapterSelected(bookId, e.target.value);
                    break;
                } else {
                    console.log(`chapter does not exist: ${e.target.value}`);
                }
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.Heading}>New Verse</h1>
            <div className={styles.row}>
                <input name="book" onChange={onChange} defaultValue={verse.book} list="books" className={styles.book}/>
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
                <select name="verse" onChange={onChange} defaultValue={verse.verse} className={styles.numList}>
                    {verseList.map((verse, key) =>
                        <option key={key}>{verse.verseId}</option>
                    )}
                </select>
            </div>
            <div className={styles.row}>
                <select name="group" onChange={onChange} className={styles.groups}>
                    {groups.map((group, key) => 
                        <option key={key}>{group.groupName}</option>
                    )}
                </select>
                <button onClick={setVerseText} className={styles.searchBtn}>Search</button>
            </div>
            <textarea name="text" placeholder='Verse Text' defaultValue={verse.text} disabled={true} className={styles.verseText}/>
            <button onClick={addVerse} className={styles.addBtn}>Add Verse</button>
        </div>
	);
}