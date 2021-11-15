import { useEffect, useState } from "react";

import styles from "./HomePage.module.css";
import { fetchApi } from "../../constants/fetchApi";
import Container from "../layouts/Container";
import Header from "../layouts/Header";
import { Link } from "react-router-dom";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const loadPageData = async () => {
    setLoading(true);
    const fetchedCategories = await fetchApi("/categories");

    if (fetchedCategories.errors) {
      setError("An error has occurred while retrieving page information...");
    } else {
      setSuccess(true);
      setCategories(fetchedCategories);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading === false && success === false && error === false) {
      //load categories && users
      loadPageData();
    }
  }, [error, loading, success]);

  if (loading) {
    return "Loading...";
  } else if (success) {
    return (
      <>
        <Header />
        <div className={styles.content}>
          <Container white={true}>
            <h1>Categories</h1>
            <table>
              <thead>
                <tr className={styles.black}>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Last updated</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {categories.map((el) => {
                  const date = new Date(el.updated_at);
                  return (
                    <tr
                      key={"head-cat-" + el.id}
                      className={el.id % 2 === 0 ? styles.white : styles.grey}
                    >
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>
                        {date.getFullYear() +
                          "-" +
                          (date.getMonth() + 1) +
                          "-" +
                          date.getDate()}
                      </td>
                      <td>
                        <Link to={"/category/" + el.id}>Edit</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Container>
        </div>
      </>
    );
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return <></>;
  }
}

export default HomePage;
