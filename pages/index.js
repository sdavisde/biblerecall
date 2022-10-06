import Layout from '../components/Layout';
import styles from '../styles/Home.module.scss';
import React, { useState, useEffect } from 'react';
import AddButton from '../components/AddButton';
import VerseBox from '../components/VerseBox';
import Lightbox from '../components/Lightbox';
import AddVerse from '../components/AddVerse';
import EditVerse from '../components/EditVerse';
import { GetAllBooks } from '../db_access/pageData';

export default function Home({ books, userId, GlobalLogin, GlobalLogout }) {
    const [loading, setLoading] = useState(false);
    const [verseList, setVerseList] = useState(null);
    const [lightboxDisplay, setLightboxDisplay] = useState(false);
    const [lightboxContent, setLightboxContent] = useState('');
    const [verse, setVerse] = useState(null);

    useEffect(() => {
        getVerses(userId);

        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [userId])

    let toggleDisplay = (target) => {
        setLightboxContent(target);
        setLightboxDisplay(!lightboxDisplay);
    };

    let deleteVerse = (id, e) => {
        setLoading(true);
        e.stopPropagation();
        fetch(`/api/delete_verse?userId=${userId}&id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                getVerses();
                setLoading(false);
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

        if (!id && !userId) return;

        fetch(`api/retrieve_verses?userId=${id ? id : userId}`)
            .then((res) => res.json())
            .then((data) => {
                if (!Array.isArray(data)) return;
                
                setVerseList(data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            })
    };

    return (
        <Layout GlobalLogin={GlobalLogin} GlobalLogout={GlobalLogout}>
            <div className={styles.bottomSection}>
                <div className={styles.verseList}>
                    <div>
                        {
                            loading ? (
                                <p className={styles.black}>Loading...</p>
                            ) : (
                                (!verseList || verseList.length == 0) ? (
                                    userId ? (
                                        <p className={styles.black}>No verses on your account yet! Add one below!</p>
                                    ) : (
                                        <p className={styles.black}>Log in to see your verses!</p>
                                    )
                                ) : (
                                    <> 
                                        {verseList.map((verse, index) =>
                                            <VerseBox key={index} verse={verse} remove={deleteVerse} update={updateVerse} userId={userId}/>
                                        )}
                                    </>
                                )
                            )
                        }
                        
                        

                        {<Lightbox key={lightboxDisplay} control={lightboxDisplay} toggleDisplay={() => toggleDisplay('None')} showClose={true}>
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
                        </Lightbox>}
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