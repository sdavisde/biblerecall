import DynamicLogin from '../components/DynamicLogin';
import styles from '../styles/Navbar.module.scss';

export default function Navbar({ loggedIn, loggedOut }) {
    return ( 
        <nav className={styles.container}>
            <DynamicLogin loggedIn={loggedIn} loggedOut={loggedOut}/>
        </nav>
    )
}
