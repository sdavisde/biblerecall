import { database } from '../../firebaseConfig';
import { doc, deleteDoc } from 'firebase/firestore';

export default function handler(req, res) {
    const query = req.query;
    const { userId, id } = query;
    
    const docRef = doc(database, `Users/${userId}/verses/${id}`);
    deleteDoc(docRef);

    res.status(200).json({ text: 'Removed verse Successfully' });
}