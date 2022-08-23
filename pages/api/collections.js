import { app, database } from '../../firebaseConfig'
import { collection, getDocs, listCollections } from 'firebase/firestore';
              
export default function handler(req, res) {

    // database.listCollections().then(collections => {
    //     collections.map((collection) => {
    //         console.log(collection);
    //     });


    //     if (verses)
    //         res.status(200).json(verses);
    //     else
            res.status(404).json({ text: 'Failed to Retrieve Verses' });
    // });
}
