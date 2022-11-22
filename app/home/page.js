'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import styles from './page.module.scss';
import { biblical } from './(s)/sorting.js';
import VerseBox from './(c)/VerseBox';
import getVerses from '../(c)/getVerses';
import getBooks from '../(c)/getBooks';
import getUserSettings from '../(c)/getUserSettings';
import StationaryPill from "./(c)/StationaryPill";
import NewVerseLightbox from './(c)/NewVerseLightbox';

export default function HomePage({ ...props }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [ showNewVerse, setShowNewVerse ] = useState(false);
    const [ showNewCustom, setShowNewCustom ] = useState(false);
    const [ sortStyle, setSortStyle ] = useState("biblical");
    const [ theme, setTheme ] = useLocalStorage("theme", "light");
    const [ studyMode, setStudyMode ] = useLocalStorage("studyMode", 0);

    const { verses, refresh, path, error } = getVerses(session?.id);
    const { books, isLoading: books_loading, isError } = getBooks();
    const { user_settings, settings_loading, settings_error } = getUserSettings(session?.id);
    
    useEffect(() => {
        if (user_settings) {
            const user_theme = user_settings['theme']; 
            const user_study = user_settings['study_mode'];
            
            if (user_theme && theme != user_theme) {
                document.body.dataset.theme = user_theme;
                setTheme(user_theme)
            }

            if (user_study && studyMode != user_study) {
                setStudyMode(user_study)
            }
        }
    }, [user_settings])


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
    
    let sort = (sortStyle) => {
        switch (sortStyle) {
            case "biblical":
                verses?.sort(biblical);
                break;
        }
    }

    sort(sortStyle);

    return (
        <div className={styles.container}>
            {status === 'authenticated' &&
                <>
                    <h1>Home Page</h1>
                    <NewVerseLightbox addVerse={newVerse} books={books} control={showNewVerse} toggle={setShowNewVerse}/>
                    <> 
                        {Array.isArray(verses) && verses?.map((verse, index) =>
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