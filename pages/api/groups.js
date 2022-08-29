import { app, database } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';

export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        let groups = [];

        const user = collection(database, 'sean_davis');
        getDocs(user)
            .then((snapshot) => {
                snapshot.docs.map(group => {
                    let verses = [];
                    let versesRef = collection(database, 'sean_davis', group.id, 'verses');
                    
                    getDocs(versesRef)
                        .then((verses_snapshot) => {
                            verses_snapshot.docs.map(verse => {   
                                verses.push(verse.data());
                            });
                        }).then(() => {
                            groups.push({ groupName: group.id, verses: verses });

                            if (groups)
                                res.status(200).json(groups);
                            else if (groups.count == 0)
                                res.status(403).json({ text: 'No Groups Found' });
                            else
                                res.status(404).json({ text: 'Failed to Retrieve Groups' });

                            resolve();
                        });
                });
            }).catch(error => {
                res.status(405).json(error);
                resolve();
            });
    })
}
