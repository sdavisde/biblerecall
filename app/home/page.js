'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VerseBox from '../../components/VerseBox';
import AddVerse from '../(c)/AddVerse';
import getVerses from '../(c)/getVerses';
import getBooks from '../(c)/getBooks';

export default function HomePage({ ...props }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    const { verses, refresh, path, error } = getVerses(session?.id);
    const { books, isLoading, isError } = getBooks();

    let deleteVerse = (verseId) => {
        const userId = session.id;

        if (userId) {
            fetch(`/api/delete_verse?userId=${userId}&id=${verseId}`)
            .then((res) => res.json())
            .then((data) => {
                // setLoading(true);
                refresh();
                // setLoading(false);
            })
        }
    }
    
    let updateVerse = () => {
        console.log('update');
    }

    let addVerse = (verse) => {
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

    if (status === 'unauthenticated') {
        router.push('/');
    }
    
    return (
        <div>
            {status === 'authenticated' &&
                <>
                    <h1>User Home Page</h1>
                    <AddVerse addVerse={addVerse} books={books}/>
                    <> 
                        {Array.isArray(verses) && verses?.map((verse, index) =>
                            <VerseBox key={index} verse={verse} remove={deleteVerse} update={updateVerse} userId={session?.id}/>
                        )}
                    </>
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