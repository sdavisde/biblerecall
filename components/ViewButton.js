import styles from '../styles/ViewButton.module.scss'

export default function ViewButton({ ...props }) {

	return (
        <img className={styles.viewBtn} onClick={props.onClick}/>
	);
}