import { database } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';


function CreateVerse(book, chapter, verse, text) {
    const verseObject = {
        book: book,
        chapter: chapter,
        verse: verse,
        text: text
    }

    return verseObject;
}

export default function handler(req, res) {
    let newVerse = {
        book: 'Genesis',
        chapter: 1,
        verse: 1,
        text: 'In the beginning, God created the world.'
    };

    let group = 'Group_2';

    const collectionRef = collection(database, `sean_davis/${group}/verses`);
    const verse = CreateVerse(newVerse.book, newVerse.chapter, newVerse.verse, newVerse.text);
    console.log(`adding verse: ${verse} to collection `)
    addDoc(collectionRef, verse);

    res.status(200).json({ text: 'Added verse Successfully' });
}
  