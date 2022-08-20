import { app, database } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
              
export default function handler(req, res) {
    let verses = []

    const dbInstance = collection(database, 'All Verses');
    const docs = getDocs(dbInstance)
        .then((data) => {
            data.docs.map((item) => {
                console.log({ ...item.data(), id: item.id });
                verses.push({ ...item.data(), id: item.id });
            })

            if (verses)
                res.status(200).json(verses);
            else
                res.status(404).json({ text: 'Failed to Retrieve Verses' });
        });
}
  