import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import VerseBox from '../components/VerseBox';
import Lightbox from '../components/Lightbox';
import AddVerse from '../components/AddVerse';
import { GetAllVerses, GetAllBooks } from '../db_access/pageData';

export default function Home({ verses, books }) {
    const [verseList, setVerseList] = useState(verses);
    const [lightboxDisplay, setLightboxDisplay] = useState(false);
    const [lightboxContent, setLightboxContent] = useState('');

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
        <div className={styles.container}>
            <Head>
                <title>Bible Recall</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.topSection}>
                    <div className={styles.title}>
                        <h1>Bible</h1>
                        <img className={styles.bible}/> 
                        <h1>Recall</h1>          
                    </div>
                </div>
                <div className={styles.bottomSection}>
                    <div className={styles.verseList}>
                        <div>
                            {verseList.map((verse, index) =>
                                <VerseBox key={index} verse={verse} remove={deleteVerse} update={updateVerse}/>
                            )}

                            {
                                lightboxDisplay 
                                &&
                                (<Lightbox toggleDisplay={() => toggleDisplay('Add')}>
                                    {lightboxContent == 'Add' && <AddVerse books={books} formSubmitted={() => {getVerses(); toggleDisplay('None')}}/>}
                                    {lightboxContent == 'Game' && <h1>Game</h1>}
                                </Lightbox>)
                            }
                            <div className={styles.btnContainer}>
                                <AddButton onClick={() => toggleDisplay('Add')} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export async function getStaticProps() {
    let verses = GetAllVerses().then((verses) => {
        let books = GetAllBooks().then((books) => {
            return {
                props: {
                    verses,
                    books,
                },
                
                // Next.js will attempt to re-generate the page:
                // - When a request comes in
                // - At most once every 1 second
                revalidate: 1, // In seconds
            }
        });

        return books;
    });
    
    return verses;
}