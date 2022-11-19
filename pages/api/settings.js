import { database } from '../../firebaseConfig';
import { getDoc, doc } from 'firebase/firestore';
              
export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        let verses = [];
        const { userId } = req.query;

        const userRef = doc(database, 'Users', userId);
        getDoc(userRef)
            .then((snapshot) => {                
                if (snapshot.exists())
                    res.status(200).json(snapshot.data());
                else if (verses.count == 0)
                    res.status(403).json({ text: 'No User Settings Found' });
                else
                    res.status(404).json({ text: 'Failed to find User' });

                resolve();
            }).catch(error => {
                res.json(error);
                res.status(405).end;
                resolve();
            });
    });
}
  