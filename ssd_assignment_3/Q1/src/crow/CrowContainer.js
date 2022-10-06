import React from "react";
import Crow from "./Crow";

import "./crow.css";

function CrowContainer() {
  return (
    <div className='container-3'>
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Crow num={i} key={i} />
      ))}
    </div>
  );
}

export default CrowContainer;
