import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";

import { fetchApi } from "../../constants/fetchApi";
import Container from "../layouts/Container";
import Header from "../layouts/Header";
import styles from "./CatPage.module.css";
import { Link } from "react-router-dom";
import Button from "../form/Button";

function CatPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState([]);
  const loadPageData = useCallback(async () => {
    setLoading(true);
    const fetchedCategory = await fetchApi("/categories/" + id);

    if (fetchedCategory.errors) {
      setError("An error has occurred while retrieving page information...");
    } else {
      setSuccess(true);
      setCategory(fetchedCategory);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (loading === false && success === false && error === false) {
      //load categories && users
      loadPageData();
    }
  }, [error, loading, success, loadPageData]);

  if (loading) {
    return "Loading...";
  } else if (success) {
    return (
      <>
        <Header />
        <div className={styles.content}>
          <Container white={true}>
            <Link to="/">{"<- Back"}</Link>
            <h1>Links of category {category.name}</h1>
            <Button
              label="New"
              onClick={() => {
                nav("/category/" + id + "/link");
              }}
            />
            <table style={{marginTop: "12px"}}>
              <thead>
                <tr className={styles.black}>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Link</th>
                  <th>Last updated</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {category.links.map((el) => {
                  const date = new Date(el.updated_at);
                  return (
                    <tr
                      key={"head-link-" + el.id}
                      className={el.id % 2 === 0 ? styles.white : styles.grey}
                    >
                      <td>{el.id}</td>
                      <td>{el.name}</td>
                      <td>{el.link}</td>
                      <td>
                        {date.getFullYear() +
                          "-" +
                          (date.getMonth() + 1) +
                          "-" +
                          date.getDate()}
                      </td>
                      <td>
                        <Link to={"/category/" + id + "/link/" + el.id}>
                          Edit
                        </Link>
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

export default CatPage;
