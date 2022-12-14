import Profile from './Profile';
import Menu from './Menu';
import Image from 'next/image';
import bible from '../../assets/bible.png';
import styles from './Navbar.module.scss';

export default function Navbar({ ...props }) {
    return ( 
        <nav className={styles.container}>
            <div className={styles.title}>
                <h1>Bible</h1>
                <Image src={bible} width={70} height={50} className={styles.bible} alt=''/> 
                <h1>Recall</h1>
            </div>
            <div className={styles.loginContainer}>
                <Profile />
                <Menu />
            </div>
        </nav>
    )
}
