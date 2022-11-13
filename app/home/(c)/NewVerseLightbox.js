import Lightbox from '../../(c)/Lightbox';
import NewVerse from './NewVerse';

export default function NewVerseLightbox ({ addVerse, books, control, toggle }) {
    let toggleOff = () => {toggle(false)}
    
    return (
        <Lightbox key={control} control={control} showClose={true} simpleLayout={true} toggleDisplay={toggleOff}>
            <NewVerse addVerse={addVerse} books={books}/> 
        </Lightbox>
    );
}