import { app, database } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
              
export default function handler(req, res) {
    let groups = [];
    /*
        groupName,
        verses []
    */

    const user = collection(database, 'sean_davis');
    getDocs(user).then((snapshot) => {
        snapshot.docs.map(group => {
            let verses = [];
            let groupName = group.id;
            let versesRef = collection(database, 'sean_davis', group.id, 'verses');
            
            getDocs(versesRef).then((verses_snapshot) => {
                verses_snapshot.docs.map(verse => {
                    let verseData = verse.data();        
                    verses.push(verseData);
                });
            }).then(() => {
                groups.push({ groupName: groupName, verses: verses });
        
                if (groups)
                    res.status(200).json(groups);
                else if (groups.count == 0)
                    res.status(403).json({ text: 'No Groups Found' });
                else
                    res.status(404).json({ text: 'Failed to Retrieve Groups' });
            });
        });
    });
}
