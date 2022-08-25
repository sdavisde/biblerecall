import styles from '../styles/DeleteButton.module.scss'

export default function DeleteButton ({ ...props }) {

    return (
        <a className={styles.deleteBtn} onClick={props.onClick}/>
	);
}