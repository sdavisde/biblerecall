import { database } from '../firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { doc, getDoc } from 'firebase/firestore';
              
export async function GetVerseIds() {
    return new Promise((resolve, reject) => {
        let verses = [];

        const usersRef = collection(database, 'Users');

        getDocs(usersRef)
            .then((snapshot) => {
                snapshot.docs.map(doc => {
                    const versesRef = collection(database, 'Users', doc.id, 'verses');
                    
                    getDocs(versesRef)
                        .then((colSnapshot) => {
                            colSnapshot.docs.map(verse => {
                                verses.push( { verseId: verse.id, userId: doc.id } );
                            })
                        })
                });
                
                const paths = verses.map((verse) => {
                    return {
                        params: { 
                            id: verse.verseId,
                            userId: verse.userId
                        }
                    };
                });

                resolve(paths);
            });
        
    });
}
              
export async function GetVerseData(id, userId) {
    return new Promise((resolve, reject) => {    

        const verseRef = doc(database, 'Users', userId, 'verses', id);
    
        getDoc(verseRef)
            .then((snapshot) => {
                const verseData = snapshot.data();
                const verse = {...verseData, id: snapshot.id};

                resolve(verse);
            });
    });
}
  
export async function GetAllVerses() {
    return new Promise((resolve, reject) => {
        let verses = [];

        let group = 'Group_2';
    
        const versesRef = collection(database, 'sean_davis', group, 'verses');
    
        getDocs(versesRef)
            .then((snapshot) => {
                snapshot.docs.map(doc => {
                    let verseData = doc.data();
                    verses.push({...verseData, id: doc.id});
                });

                resolve(verses);
            });
    });
}

export async function GetAllBooks() {
    return new Promise((resolve, reject) => {
        fetch('https://bible-go-api.rkeplin.com/v1/books')
        .then((res) => res.json())
        .then((data) => {
            resolve(data);
        });
    });
      
}