import { database } from '../../firebaseConfig';
import { doc, getDocs, collection } from 'firebase/firestore';
              
export default function handler(req, res) {
    let verses = [];

    let group = 'Group_2';

    const versesRef = collection(database, 'sean_davis', group, 'verses');

    getDocs(versesRef).then((snapshot) => {
        snapshot.docs.map(doc => {
            let verseData = doc.data();
            console.log(`verse: ${JSON.stringify(verseData)}`) 

            verses.push(verseData);
        });

        if (verses)
            res.status(200).json(verses);
        else if (verses.count == 0)
            res.status(403).json({ text: 'No Verses Found' });
        else
            res.status(404).json({ text: 'Failed to Retrieve Verses' });
    });
}
  