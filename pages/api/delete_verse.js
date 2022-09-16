import { database } from '../../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

export default function handler(req, res) {
    const query = req.query;
    const { id } = query;
    const group = 'Group_2';
    
    const docRef = doc(database, `sean_davis/${group}/verses/${id}`);
    deleteDoc(docRef);

    res.status(200).json({ text: 'Removed verse Successfully' });
}