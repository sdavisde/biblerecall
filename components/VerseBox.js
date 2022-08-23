import styles from '../styles/VerseBox.module.scss'
import EditButton from './EditButton'
import ViewButton from './ViewButton';

export default function VerseBox ({ book, chapter, verse, text }) {

    return (
        <div className={styles.box}>
            <div className={styles.leftSection}>
                <h1>
                    {book} {chapter} : {verse} <br/>
                </h1>
                <h4>
                    {text}
                </h4>
            </div>
            <div className={styles.rightSection}>
                <ViewButton />
                <EditButton />
            </div>
        </div>
	);
}