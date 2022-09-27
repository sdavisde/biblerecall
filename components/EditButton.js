import styles from '../styles/EditButton.module.scss'
import Image from 'next/image';

export default function EditButton({...props}) {

	return (
        <Image className={styles.editBtn} onClick={props.onClick} width={50} height={50} alt='Edit'/>
	);
}