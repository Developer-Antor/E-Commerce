import { Link } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import "./NotAdmin.css";

function NotAdmin() {
  const history = useHistory();
  return (
    <div className="not-admin">
      <div className="container-not">
        <h1>Sorry!You Are Not Admin.</h1>
        <Link
          onClick={() => {
            history.push("/login");
          }}
        >
          Login Ase Admin
        </Link>
      </div>
    </div>
  );
}

export default NotAdmin;
