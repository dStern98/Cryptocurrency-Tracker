import React from "react";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex flex-row align-items-center justify-content-center mt-5">
        <span className="mx-1 fs-1">Oops! This is an invalid path.</span>
        <Link to="/">
          <FcHome size={45} />
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
