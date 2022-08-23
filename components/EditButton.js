import styles from '../styles/EditButton.module.scss'

export default function EditButton({...props}) {

	return (
        <img className={styles.editBtn} onClick={props.onClick}/>
	);
}