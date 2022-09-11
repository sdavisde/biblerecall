import React, { useState, useEffect } from 'react';
import AddButton from './AddButton';
import VerseBox from './VerseBox';
import Lightbox from './Lightbox';
import AddVerse from './AddVerse';
import styles from '../styles/Hub.module.scss';

export default function Hub({...props}) {
    const [verseList, setVerseList] = useState([]);
    const [groups, setGroups] = useState([]);
    const [currentGroup, setCurrentGroup] = useState('');
    const [lightboxDisplay, setLightboxDisplay] = useState(false);
    const [lightboxContent, setLightboxContent] = useState('');

    useEffect(() => {
        getVerses();
    }, []);

    let toggleDisplay = (target) => {
        setLightboxContent(target);
        setLightboxDisplay(!lightboxDisplay);
    };

    let refreshGroups = () => {
        fetch('api/groups')
            .then((res) => res.json())
            .then((data) => {
                setCurrentGroup(data[0].groupName ?? '');
                setGroups(data);
            })
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
                setVerseList(data);
                refreshGroups();
            })
    };

    return (
        <>
            {/* <div className={styles.leftSection}>
                {groups.map((group, index) => 
                    <div key={index}>
                        <h2 key={group.groupName + index} className={styles.groupLabel}>
                            {group.groupName}
                        </h2>
                        <div key={index} className={styles.verses}>
                            {group.verses.map((verse, index_2) => 
                                <h4 key={verse.book + verse.chapter + verse.verse + index_2} className={styles.verse}>
                                    {verse.book} {verse.chapter}:{verse.verse}
                                </h4>
                            )}
                        </div>
                    </div>
                )}
            </div> */}
            <div className={styles.verseList}>
                <div>
                    {verseList.map((verse, index) =>
                        <VerseBox key={index} verse={verse} remove={deleteVerse} view={() => toggleDisplay('Edit')}/>
                    )}

                    {
                        lightboxDisplay 
                        &&
                        (<Lightbox toggleDisplay={() => toggleDisplay('Add')}>
                            {lightboxContent == 'Add' && <AddVerse formSubmitted={getVerses}/>}
                            {lightboxContent == 'Edit' && <h1>Edit Verse</h1>}
                        </Lightbox>)
                    }
                    
                    <AddButton onClick={() => toggleDisplay('Add')} />
                </div>              
            </div>
        </>
	);
}