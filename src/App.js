import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import ProtectedPage from "./components/protectedPage/ProtectedPage";
import HomePage from "./components/home/HomePage";
import CatPage from "./components/categories/CatPage";
import LinkPage from "./components/links/LinkPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />

        <Route
          exact
          path="/category/:id/link/:linkId"
          element={
            <ProtectedPage>
              <LinkPage />
            </ProtectedPage>
          }
        />
        <Route
          exact
          path="/category/:id/link"
          element={
            <ProtectedPage>
              <LinkPage />
            </ProtectedPage>
          }
        />
        <Route
          exact
          path="/category/:id"
          element={
            <ProtectedPage>
              <CatPage />
            </ProtectedPage>
          }
        />

        <Route
          exact
          path="/"
          element={
            <ProtectedPage>
              <HomePage />
            </ProtectedPage>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
