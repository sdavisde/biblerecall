import Image from 'next/image';
import styles from './page.module.scss';
import bible from '../assets/bible.png';

export default function Layout({ ...props }) {

    return (
        <main className={styles.main}>
            <div className={styles.section}>
                <div className={styles.title}>
                    <h1>Bible</h1>
                    <Image src={bible} className={styles.bible} alt='Bible Logo' width={200} height={75}/> 
                    <h1>Recall</h1>          
                </div>
                <p className={styles.message}>
                    Website under maintanence. Contact Sean at 214-799-7708 to let him know you're trying to use it and to hurry up!
                </p>
            </div>
        </main>
    )
}