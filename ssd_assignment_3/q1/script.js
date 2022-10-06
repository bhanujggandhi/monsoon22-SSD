const droppable = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};

const drop = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  if (!e.target.id.match(/crow*/g) && !e.target.id.match(/vulture/g))
    e.target.appendChild(document.getElementById(data));
};
