import React from "react";
import { useDrag } from "react-dnd";

import "./crow.css";

function Crow({ num }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "crow",
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  return (
    <div
      ref={drag}
      className='crowplace'
      id={`crow${num}`}
      style={{ background: isDragging ? "green" : "yellow" }}
    ></div>
  );
}

export default Crow;
