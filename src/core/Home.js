import React from "react";
import "../styles.css";
import Base from "./Base";

export default function Home() {

  return (
    <Base title="Home Page" description="Welcome to the Tshirt Store">
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
      </div>
    </Base>
  );
}
