import { useNavigate, useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";

import { fetchApi } from "../../constants/fetchApi";
import Container from "../layouts/Container";
import Header from "../layouts/Header";
import styles from "./LinkPage.module.css";
import { Link } from "react-router-dom";
import InputField from "../form/InputField";
import Button from "../form/Button";

function LinkPage() {
  const { id, linkId } = useParams();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [link, setLink] = useState({
    name: "",
    link: "",
  });

  const loadPageData = useCallback(async () => {
    setLoading(true);
    const fetchedLink = await fetchApi(
      "/categories/" + id + "/links/" + linkId
    );

    if (fetchedLink.errors) {
      setError("An error has occurred while retrieving page information...");
    } else {
      setSuccess(true);
      let linkData = { name: fetchedLink.name, link: fetchedLink.link };
      setLink(linkData);
    }
    setLoading(false);
  }, [id, linkId]);

  useEffect(() => {
    if (loading === false && success === false && error === false && linkId) {
      //load categories && users
      loadPageData();
    }
  }, [error, loading, success, loadPageData, linkId]);

  const updateLink = (data) => {
    setLink({ ...link, ...data });
  };

  const saveLink = async () => {
    setLoading(true);
    const saveResult = await fetchApi(
      linkId
        ? "/categories/" + id + "/links/" + linkId
        : "/categories/" + id + "/links",
      linkId ? "PUT" : "POST",
      link
    );
    if (saveResult.errors) {
      setError("An error has occurred while saving...");
    } else {
      nav("/category/" + id);
    }
    setLoading(false);
  };

  if (loading) {
    return "Loading...";
  } else if (success || !linkId) {
    return (
      <>
        <Header />
        <div className={styles.content}>
          <Container white={true}>
            <Link to={"/category/" + id}>{"<- Back"}</Link>
            <h1>{linkId ? "Edit link" : "New link"}</h1>
            <InputField
              label="Name"
              onChange={(value) => {
                updateLink({ name: value });
              }}
              id="linkName"
              value={link.name}
            />
            <InputField
              label="Link"
              onChange={(value) => {
                updateLink({ link: value });
              }}
              id="linkUrl"
              value={link.link}
            />

            <Button
              label="Save"
              onClick={() => {
                saveLink();
              }}
            />
            <p className={styles.error}>{error}</p>
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

export default LinkPage;
