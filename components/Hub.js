import React, { useState, useEffect, useRef } from 'react';
import AddButton from './AddButton';
import VerseBox from './VerseBox';
import Lightbox from './Lightbox';
import CloseButton from './CloseButton';
import styles from '../styles/Hub.module.scss';

export default function Hub({...props}) {
    const [book, setBook] = useState('Genesis');
    const [chapter, setChapter] = useState(1);
    const [verse, setVerse] = useState(1);
    const [verseList, setVerseList] = useState([]);
    const [lightboxDisplay, setLightboxDisplay] = useState(false);

    useEffect(() => {
        getVerses();
    }, []);

    let toggleDisplay = () => {
        console.log(`lightbox display: ${lightboxDisplay}`)
        setLightboxDisplay(!lightboxDisplay);
    };

    let addVerse = (event) => {
        console.log('added verse');
        // setLoading(true);
        event.preventDefault();
        fetch(`/api/add_verse?book=${book}&${chapter}&${verse}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
            });
    }

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
        <div>book={verse.book} chapter={verse.chapter} verse={verse.verse} text={verse.text}
            
            {verseList.map((verse, index) =>
                <VerseBox key={index} {...verse}/>
            )}

            {
                lightboxDisplay 
                &&
                (<Lightbox toggleDisplay={() => toggleDisplay()} formSubmitted={addVerse}>
                    <h1 className={styles.Heading}>New Verse</h1>
                    <select>
                        <option>Genesis</option>
                        <option>Exodus</option>
                        <option>Leviticus</option>
                    </select>
                    <input placeholder='Chapter'></input>
                    <input placeholder='Verse'></input>
                    <textarea placeholder='Verse Text'/>
                    <button onClick={addVerse}>Add Verse</button>
                </Lightbox>)
            }
            
            <AddButton onClick={toggleDisplay} />
        </div>
	);
}