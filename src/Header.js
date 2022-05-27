import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ marginTop: "1rem" }} className="ui container clearing segment">
      <Link to="/list">
        <h3 className="ui right floated header">Go to Library</h3>
      </Link>
      <Link to="/">
        <h3 className="ui left floated header">Add Clip</h3>
      </Link>
    </div>
  );
};

export default Header;
