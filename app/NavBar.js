import Login from './Login';
import Image from 'next/image';
import bible from '../assets/bible.png';
import styles from '../styles/Navbar.module.scss';

export default function Navbar({ ...props }) {
    return ( 
        <nav className={styles.container}>
            <div className={styles.title}>
                <h1>Bible</h1>
                <Image src={bible} width={70} height={50} className={styles.bible} alt=''/> 
                <h1>Recall</h1>
            </div>
            <div className={styles.loginContainer}>
                <Login />
            </div>
        </nav>
    )
}
