import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import VerseBox from './VerseBox';
import Lightbox from './Lightbox';
import AddVerse from './AddVerse';
import VerseGame from './VerseGame';
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
        fetch(`/api/delete_verse?id=${id}&group=${currentGroup}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
            })
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

    let openGame = (verse) => {
        console.log(verse);
        setClickedVerse(verse);
        toggleDisplay('Game');
    };

    return (
        <>
            <div className={styles.verseList}>
                <div>
                    {verseList.map((verse, index) =>
                        <VerseBox key={index} verse={verse} remove={deleteVerse} view={openGame}/>
                    )}

                    {
                        lightboxDisplay 
                        &&
                        (<Lightbox toggleDisplay={() => toggleDisplay('Add')}>
                            {lightboxContent == 'Add' && <AddVerse formSubmitted={getVerses}/>}
                            {lightboxContent == 'Game' && <VerseGame verse={clickedVerse} />}
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