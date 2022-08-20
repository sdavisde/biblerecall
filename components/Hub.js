import React, { useState, useEffect } from 'react';
import { app, database } from '../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import AddButton from './AddButton';
import Verse from './Verse';

export default function Hub({...props}) {
    const [book, setBook] = useState('Genesis');
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);
    const [verseList, setVerseList] = useState([]);
    
    const dbInstance = collection(database, 'All Verses');

    useEffect(() => {
        getVerses();
        console.log('in use effect')
    }, []);

    let addVerse = (event) => {
        // setLoading(true);
        event.preventDefault();
        fetch(`/api/add_verse?book=${book}&${chapter}&${verse}`)
            .then((res) => res.json())
            .then((data) => {
                loadVerses();
            });
    };

    let getVerses = () => {
        // setLoading(true);
        fetch('api/retrieve_verses')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVerseList(data);
            })
    };

    return (
        <div>
            
            {verseList.map((verse, index) =>
                <Verse key={index} book={verse.Book} chapter={verse.Chapter} verse={verse.Verse} text={verse.Text}/>
            )}
            
            <AddButton onClick={addVerse} />
        </div>
	);
}