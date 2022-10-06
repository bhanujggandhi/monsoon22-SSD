import React from "react";
import { useDrop } from "react-dnd";
import Tilt from "react-parallax-tilt";

import Star from "./Star";
import "./star.css";

function StarContainer() {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "crow",
    drop: (item) => crowPlay(item.id),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  const crowPlay = (id) => {
    console.log(id);
  };
  return (
    <div className='container-2'>
      {/* <Tilt> */}
      <>
        <Star />
        <div id='dropid'>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={`elp${i}`}
              className='inpplace'
              id={`elp${i}`}
              ref={drop}
            ></div>
          ))}
        </div>
      </>
      {/* </Tilt> */}
    </div>
  );
}

export default StarContainer;
