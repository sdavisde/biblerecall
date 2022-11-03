'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VerseBox from '../../components/VerseBox';
import useSWR from 'swr';
// import styles from './page.module.scss';

// async function getVerses(userId) {
//     console.log(`userId: ${userId}`);
//     if (!userId) return [];


// }

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function HomePage({ ...props }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    // const verses = use(getVerses(session?.id));

    const { data, error } = useSWR(`/api/retrieve_verses?userId=${session?.id}`, fetcher);

    let deleteVerse = () => {
        console.log('delete');
    }
    
    let updateVerse = () => {
        console.log('update');
    }

    if (status === 'unauthenticated') {
        router.push('/');
    }
    
    return (
        <div>
            {status === 'authenticated' &&
                <>
                    <h1>User Home Page</h1>
                    <p>{session?.user?.name} - {session?.user?.email}</p>
                    <> 
                        {data?.map((verse, index) =>
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
            {status === undefined &&
                <>
                    Loading...
                </>
            }
            
        </div>
    )
}