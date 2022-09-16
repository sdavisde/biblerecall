import { database } from '../../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
              
export async function GetVerseIds() {
    return new Promise((resolve, reject) => {
        let verses = [];

        let group = 'Group_2';

        const versesRef = collection(database, 'sean_davis', group, 'verses');

        getDocs(versesRef)
            .then((snapshot) => {
                snapshot.docs.map(doc => {
                    verses.push( doc.id );
                });
                
                const paths = verses.map((verseId) => {
                    return {
                        params: { id: verseId }
                    };
                });

                resolve(paths);
            });
        
    });
}
              
export async function GetVerseData(id) {
    return new Promise((resolve, reject) => {
        const group = 'Group_2';
    
        const verseRef = doc(database, 'sean_davis', group, 'verses', id);
    
        getDoc(verseRef)
            .then((snapshot) => {
                const verseData = snapshot.data();
                console.log(verseData);
                const verse = {...verseData, id: snapshot.id};

                resolve(verse);
            });
    });
}
  