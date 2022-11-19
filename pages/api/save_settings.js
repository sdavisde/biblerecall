import { database } from '../../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
              
export default function handler(req, res) {
    return new Promise((resolve, reject) => {
        const { userId, theme, study_mode } = req.query;

        setDoc(doc(database, "Users", userId), {
            theme: theme,
            study_mode: study_mode,
        }).then(() => {
            resolve();
        });        
    });
}
  