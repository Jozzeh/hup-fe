import styles from "./Container.module.css";
function Container(props) {
  const { white } = props;
  return (
    <div className={styles.outer}>
      <div className={white ? `${styles.inner} ${styles.white}` : styles.inner}>
        {props.children}
      </div>
    </div>
  );
}
export default Container;
