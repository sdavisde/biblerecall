'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import styles from './page.module.scss';
import { biblical } from './(s)/sorting.js';
import VerseBox from './(c)/VerseBox';
import getVerses from '../(c)/getVerses';
import getBooks from '../(c)/getBooks';
import StationaryPill from "./(c)/StationaryPill";
import NewVerseLightbox from './(c)/NewVerseLightbox';

export default function HomePage({ ...props }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [ showNewVerse, setShowNewVerse ] = useState(false);
    const [ showNewCustom, setShowNewCustom ] = useState(false);
    const [ sortStyle, setSortStyle ] = useState("biblical");

    const { verses, refresh, path, error } = getVerses(session?.id);
    const { books, isLoading, isError } = getBooks();
    
    let deleteVerse = (verseId) => {
        const userId = session.id;

        if (userId) {
            fetch(`/api/delete_verse?userId=${userId}&id=${verseId}`)
                .then((res) => res.json())
                .then((data) => {
                    setTimeout(() => {
                        refresh();
                    }, 500);
                })
        }
    }
    
    let updateVerse = () => {
        console.log('update');
    }

    let newVerse = (verse) => {
        setShowNewVerse(false);
        const userId = session.id;

        if (userId) { // User is logged in
            const { book, chapterId, verseId, text, group } = verse;
            fetch(`/api/add_verse?book=${book}&chapter=${chapterId}&verseNumber=${verseId}&text=${text}&group=${group}&userId=${userId}`)
                .then((res) => res.json())
                .then((data) => {
                    refresh();
                });
        }
    }

    let newCustom = (verse) => {
        console.log(`add custom verse`);
    }

    if (status === 'unauthenticated') {
        router.push('/');
    }
    
    let sort = (verses, sortStyle) => {
        switch (sortStyle) {
            case "biblical":
                verses.sort(biblical);
        }

        return verses;
    }

    return (
        <div className={styles.container}>
            {status === 'authenticated' &&
                <>
                    <h1>Home Page</h1>
                    <NewVerseLightbox addVerse={newVerse} books={books} control={showNewVerse} toggle={setShowNewVerse}/>
                    <> 
                        {Array.isArray(verses) && sort(verses)?.map((verse, index) =>
                            <VerseBox key={index} verse={verse} remove={deleteVerse} update={updateVerse} userId={session?.id}/>
                        )}
                    </>
                    <StationaryPill showNewVerse={() => setShowNewVerse(true)} showNewCustom={() => setShowNewCustom(true)}/>
                </>
            }
            {status === 'unauthenticated' &&
                <>
                    <p>Not logged in. Redirecting...</p>
                </>
            }
            {(status === undefined || !verses) &&
                <>
                    Loading...
                </>
            }
            
        </div>
    )
}