import bible from '../assets/bible.png';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Layout.module.scss';

export default function Layout({ ...props }) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Bible Recall</title>
                <meta name="description" content="Come Memorize Scripture with Us!" />
                <link rel="icon" href="/bible.png" />
            </Head>
            <main className={styles.main}>
                <Navbar GlobalLogin={props.GlobalLogin} GlobalLogout={props.GlobalLogout}/>
                <div className={styles.topSection}>
                    <div className={styles.title}>
                        <h1>Bible</h1>
                        <Image src={bible} width={100} height={75} className={styles.bible} alt=''/> 
                        <h1>Recall</h1>          
                    </div>
                </div>
                {props.children}
            </main>
        </div>
    )
}