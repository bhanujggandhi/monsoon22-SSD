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

const crowToElp = {
  crow1: "",
  crow2: "",
  crow3: "",
  crow4: "",
  crow5: "",
  crow6: "",
  crow7: "",
  vulture: "",
};

let turn = 0;

const droppable = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
};

const drop = (e) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");

  if (e.target.id in elpToCrow && elpToCrow[e.target.id] === "") {
    if (turn === 0 && data.match(/crow*/g)) {
      e.target.appendChild(document.getElementById(data));
      turn = 1;
      if (crowToElp[data] !== "") {
        elpToCrow[crowToElp[data]] = "";
      }
      elpToCrow[e.target.id] = data;
      crowToElp[data] = e.target.id;
    } else if (turn === 1 && data.match(/vulture/g)) {
      e.target.appendChild(document.getElementById(data));
      elpToCrow[e.target.id] = data;
      turn = 0;
      if (crowToElp[data] !== "") {
        elpToCrow[crowToElp[data]] = "";
      }
      elpToCrow[e.target.id] = data;
      crowToElp[data] = e.target.id;
    }
    console.log(JSON.stringify(elpToCrow));
  }
};
