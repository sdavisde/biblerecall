import { database } from '../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
              
export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        let verses = [];
        const { userId } = req.query;

        console.log(`in retrieve_verses USERID: ${userId}`);

        // UserId > Group_2 > verses > ...
        const versesRef = collection(database, 'Users', userId, 'verses');
        getDocs(versesRef)
            .then((snapshot) => {
                snapshot.docs.map(doc => {
                    let verseData = doc.data();
                    verses.push({...verseData, id: doc.id});
                });
                
                if (verses)
                    res.status(200).json(verses);
                else if (verses.count == 0)
                    res.status(403).json({ text: 'No Verses Found' });
                else
                    res.status(404).json({ text: 'Failed to Retrieve Verses' });

                resolve();
            }).catch(error => {
                res.json(error);
                res.status(405).end;
                resolve();
            });
    });
}
  