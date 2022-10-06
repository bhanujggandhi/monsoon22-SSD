import React from "react";
import Tilt from "react-parallax-tilt";

import Star from "./Star";
import "./star.css";

function StarContainer() {
  return (
    <div className='container-2'>
      <Tilt>
        <>
          <Star />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={`elp${i}`} className='inpplace' id={`elp${i}`}></div>
          ))}
        </>
      </Tilt>
    </div>
  );
}

export default StarContainer;
