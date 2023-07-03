import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
