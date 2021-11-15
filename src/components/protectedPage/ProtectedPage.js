import { Navigate } from "react-router-dom";
function ProtectedPage(props) {
  const token = localStorage.getItem("HupUserToken");
  if (token) {
    return <>{props.children}</>;
  } else {
    return <Navigate to="/login"/>;
  }
}
export default ProtectedPage;
