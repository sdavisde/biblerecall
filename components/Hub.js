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
    const [groups, setGroups] = useState([]);
    const [lightboxDisplay, setLightboxDisplay] = useState(false);

    useEffect(() => {
        getVerses();
    }, []);

    let toggleDisplay = () => {
        console.log(`lightbox display: ${lightboxDisplay}`)
        setLightboxDisplay(!lightboxDisplay);
    };

    let refreshGroups = () => {
        fetch('api/collections')
            .then((res) => res.json())
            .then((data) => {
                setGroups(data);
            })
    };

    let deleteVerse = (id) => {
        console.log(id);
        fetch(`/api/delete_verse?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
            })
    };

    let addVerse = (event) => {
        // setLoading(true);
        event.preventDefault();
        fetch(`/api/add_verse?book=${book}&${chapter}&${verse}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
            });
    };

    let getVerses = () => {
        // setLoading(true);
        fetch('api/retrieve_verses')
            .then((res) => res.json())
            .then((data) => {
                setVerseList(data);
                refreshGroups();
            })
    };

    return (
        <>
            <div className={styles.leftSection}>
                {groups.map((group, index) => 
                    <div>
                        <h2 key={index} className={styles.groupLabel}>
                            {group.groupName}
                        </h2>
                        <div key={index + 1000} className={styles.verses}>
                            {group.verses.map((verse, index_2) => 
                                <h4 key={index_2} className={styles.verse}>{verse.book} {verse.chapter}:{verse.verse}</h4>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.rightSection}>
                <div>
                    {verseList.map((verse, index) =>
                        <VerseBox key={index} verse={verse} remove={deleteVerse}/>
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
            </div>
        </>
	);
}