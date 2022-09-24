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
    const query = req.query;
    const { book, chapter, verseNumber, text, group, userId } = query;

    let newVerse = {
        book: book,
        chapter: chapter,
        verse: verseNumber,
        text: text
    };

    const collectionRef = collection(database, `Users/${userId}/verses`);
    const verse = CreateVerse(newVerse.book, newVerse.chapter, newVerse.verse, newVerse.text);

    addDoc(collectionRef, verse)
        .then(() => {
            res.status(200).json({ text: 'Added verse Successfully' });
        }).catch(error => {
            res.status(405).json(error);
        });

}
  