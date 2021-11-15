import styles from './Button.module.css';

function Button(props) {
  const {onClick, label} = props;

  return(
    <button onClick={() => {onClick()}} className={styles.button}>
      {label}
    </button>
  )
}

export default Button;