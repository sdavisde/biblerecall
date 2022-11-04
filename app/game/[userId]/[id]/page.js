import { database } from '../../../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
import arrow from '../../../../assets/arrow.png';
import Image from 'next/image';
import Link from 'next/link';
import Game from './Game';

async function getVerse(userId, verseId) {
    console.log('getverses');
    console.log(`userId: ${userId}`)
    console.log(`verseId: ${verseId}`)

    if (!userId || !verseId) return null;

    return new Promise((resolve, reject) => {    

        const verseRef = doc(database, 'Users', userId, 'verses', verseId);
    
        getDoc(verseRef)
            .then((snapshot) => {
                const verseData = snapshot.data();
                const verse = {...verseData, id: snapshot.id};
                resolve(verse);
            });
    });
}

export default async function GamePage({ params, searchParams }) {
    const verse = await getVerse(params.userId, params.id);

    return (
        <>
            <Game verseData={verse}/>
            <Link href={"/home"}>
                <Image 
                    src={arrow}
                    width={50}
                    height={50}
                    alt='Back To Home'
                />
            </Link>
        </>
	);
}