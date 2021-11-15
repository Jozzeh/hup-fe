import Container from "./Container";
import Button from "../form/Button";

import styles from "./Header.module.css";
import { useNavigate } from "react-router";

function Header() {
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem('HupUserToken')
    nav("/login");
  }
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.right}>
          <Button label="Logout" onClick={() => {logout()}} />
        </div>
      </Container>
    </header>
  );
}
export default Header;
