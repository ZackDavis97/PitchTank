import useFirebase from "../hooks/useFirebase";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useFirebase();

  if (loading) {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{
          height: "100vh",
        }}
      >
        <div
          className="
          spinner-grow inline-block h-8 w-8 rounded-full bg-current text-primary
            opacity-0
          "
          role="status"
        ></div>
      </div>
    );
  }

  return user?.email ? children : <Navigate to={"/signin"} />;
};

export default PrivateRoute;