import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import VerseBox from '../components/VerseBox';
import Lightbox from '../components/Lightbox';
import AddVerse from '../components/AddVerse';
import EditVerse from '../components/EditVerse';
import { GetAllBooks } from '../db_access/pageData';

export default function Home({ books, userId, loggedIn, loggedOut }) {
    const [loading, setLoading] = useState(false);
    const [verseList, setVerseList] = useState(null);
    const [lightboxDisplay, setLightboxDisplay] = useState(false);
    const [lightboxContent, setLightboxContent] = useState('');
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        getVerses(userId);
    }, [userId])

    let toggleDisplay = (target) => {
        setLightboxContent(target);
        setLightboxDisplay(!lightboxDisplay);
    };

    let deleteVerse = (id, e) => {
        setLoading(true);
        e.stopPropagation();
        fetch(`/api/delete_verse?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
            })
    };

    let updateVerse = (id, e) => {
        setLoading(true);
        console.log(e);
        console.log(`Update verse: ${JSON.stringify(verseList.filter(verse => verse.id === id))}`)
        setVerse(verseList.filter(verse => verse.id === id));
        toggleDisplay('Edit');
    }

    let getVerses = (id) => {
        setLoading(true);
        fetch(`api/retrieve_verses?userId=${id ? id : userId}`)
            .then((res) => res.json())
            .then((data) => {
                setVerseList(data);
            })
    };

    return (
        <Layout loggedIn={loggedIn} loggedOut={loggedOut}>
            <div className={styles.bottomSection}>
                <div className={styles.verseList}>
                    <div>
                        {(!verseList || verseList.length == 0) ? (
                            userId ? (
                            <p className={styles.noVerseList}>No Verses on your account yet! Add one below!</p>
                            ) : (
                                <p className={styles.noVerseList}>Log in to see your verses!</p>
                            )
                        ) : (
                            <>
                                {verseList.map((verse, index) =>
                                    <VerseBox key={index} verse={verse} remove={deleteVerse} update={updateVerse} userId={userId}/>
                                )}
                            </>
                        )

                        }
                        

                        {
                            lightboxDisplay 
                            &&
                            (<Lightbox toggleDisplay={() => toggleDisplay('None')} showClose={true}>
                                {lightboxContent == 'Add' && 
                                    <AddVerse 
                                        books={books} 
                                        formSubmitted={() => {getVerses(); toggleDisplay('None')}}
                                        userId={userId}
                                        key={userId}/>
                                }
                                {lightboxContent == 'Edit' && 
                                    <EditVerse 
                                        books={books} 
                                        verse={verse} 
                                        id={verse.id}
                                        formSubmitted={() => {getVerses(); toggleDisplay('None')}}/>
                                }
                            </Lightbox>)
                        }
                        <div className={styles.btnContainer}>
                            {userId &&
                                <AddButton onClick={() => toggleDisplay('Add')} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the verse game using params.id
    let books = GetAllBooks().then((books) => {
        return {
            props: {
                books: books
            }
        };
    });

    return books;
}
// export async function getServerSideProps() {
//     let verses = GetAllVerses().then((verses) => {
//         let books = GetAllBooks().then((books) => {
//             return {
//                 props: {
//                     verses: verses,
//                     books: books,
//                 }
//             }
//         });

//         return books;
//     });
    
//     return verses;
// }