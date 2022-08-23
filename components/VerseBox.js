import styles from '../styles/VerseBox.module.scss'
import EditButton from './EditButton'
import ViewButton from './ViewButton';

export default function VerseBox ({ book, chapter, verse, text }) {

    return (
        <div className={styles.box}>
            <div className={styles.leftSection}>
                <h3>
                    {book} {chapter} : {verse} <br/>
                </h3>
                <p>
                    {text}
                </p>
            </div>
            <div className={styles.rightSection}>
                <ViewButton />
                <EditButton />
            </div>
        </div>
	);
}