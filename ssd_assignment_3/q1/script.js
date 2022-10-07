// Adj to 0 index are 1 and 7
const adjacents = [
  "17",
  "0237",
  "13",
  "1249",
  "39",
  "89",
  "78",
  "0168",
  "5679",
  "3458",
];

const elpToCrow = {
  elp0: "",
  elp1: "",
  elp2: "",
  elp3: "",
  elp4: "",
  elp5: "",
  elp6: "",
  elp7: "",
  elp8: "",
  elp9: "",
};

const droppable = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};

const drop = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  // if (!e.target.id.match(/crow*/g) && !e.target.id.match(/vulture/g)) {
  if (e.target.id in elpToCrow && elpToCrow[e.target.id] === "") {
    e.target.appendChild(document.getElementById(data));
    elpToCrow[e.target.id] = data;
    console.log(JSON.stringify(elpToCrow));
  }
};
