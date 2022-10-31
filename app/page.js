import Image from 'next/image';
import styles from './page.module.scss';

export default function Layout({ ...props }) {

    return (
        <main className={styles.main}>
            <div className={styles.section}>
                <p className={styles.message}>
                    Website under maintanence. Contact Sean at 214-799-7708 to let him know you're trying to use it and to hurry up!
                </p>
            </div>
        </main>
    )
}