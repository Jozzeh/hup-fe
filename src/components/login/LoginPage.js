import { useState } from "react";
import { fetchApi } from "../../constants/fetchApi";
import { useNavigate } from "react-router-dom";

import Button from "../form/Button";
import InputField from "../form/InputField";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validate = () => {
    let validated = true;
    if (email === "") {
      validated = false;
    }
    if (password === "") {
      validated = false;
    }
    return validated;
  };

  const login = async () => {
    if (validate()) {
      const result = await fetchApi("/login", "POST", {
        email: email,
        password: password,
      });
      console.log(result)
      if (result.errors) {
        setError(result.errors[0].message);
      } else {
        localStorage.setItem("HupUserToken", result.token);
        navigate("/");
      }
    } else {
      setError("All fields are mandatory.");
    }
  };

  return (
    <div className={styles.flexpage}>
      <section className={styles.loginsection}>
        <InputField
          label="E-mail"
          type="email"
          id="email"
          onChange={(value) => {
            setEmail(value);
          }}
          value={email}
        />
        <InputField
          label="Password"
          type="password"
          id="password"
          onChange={(value) => {
            setPassword(value);
          }}
          value={password}
        />

        <Button
          label="Submit"
          onClick={() => {
            login();
          }}
        />
        {error !== "" ? <p className={styles.error}>{error}</p> : null}
      </section>
    </div>
  );
}
export default LoginPage;
