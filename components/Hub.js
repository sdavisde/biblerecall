import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AddButton from './AddButton';
import VerseBox from './VerseBox';
import Lightbox from './Lightbox';
import AddVerse from './AddVerse';
import styles from '../styles/Hub.module.scss';

export default function Hub({...props}) {
    const [verseList, setVerseList] = useState([]);
    const [clickedVerse, setClickedVerse] = useState({
        id: '',
        book: '',
        chapter: '',
        verse: '',
        text: '',
    });
    const [lightboxDisplay, setLightboxDisplay] = useState(false);
    const [lightboxContent, setLightboxContent] = useState('');

    useEffect(() => {
        getVerses();
    }, []);

    let toggleDisplay = (target) => {
        setLightboxContent(target);
        setLightboxDisplay(!lightboxDisplay);
    };

    let deleteVerse = (id, e) => {
        console.log(e, id);
        e.stopPropagation();
        fetch(`/api/delete_verse?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
            })
    };

    let updateVerse = (id, e) => {
        console.log(e);
        console.log(`Update verse: ${JSON.stringify(verseList.filter(verse => verse.id === id))}`)
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
        <>
            <div className={styles.verseList}>
                <div>
                    {verseList.map((verse, index) =>
                        <VerseBox key={index} verse={verse} remove={deleteVerse} update={updateVerse}/>
                    )}

                    {
                        lightboxDisplay 
                        &&
                        (<Lightbox toggleDisplay={() => toggleDisplay('Add')}>
                            {lightboxContent == 'Add' && <AddVerse formSubmitted={getVerses}/>}
                            {lightboxContent == 'Game' && <h1>Game</h1>}
                        </Lightbox>)
                    }
                    <div className={styles.btnContainer}>
                        <AddButton onClick={() => toggleDisplay('Add')} />
                    </div>
                </div>              
            </div>
        </>
	);
}