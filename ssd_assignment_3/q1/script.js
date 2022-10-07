// Adj to 0 index are 1 and 7
const adjacents = [
  [1, 7],
  [0, 2, 3, 7],
  [1, 3],
  [1, 2, 4, 9],
  [3, 9],
  [8, 9],
  [7, 8],
  [0, 1, 6, 8],
  [5, 6, 7, 9],
  [3, 4, 5, 8],
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
let crowPlaced = 0;

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
    // Crow Turn
    if (turn === 0 && data.match(/crow*/g)) {
      if (crowToElp[data] === "") {
        e.target.appendChild(document.getElementById(data));
        elpToCrow[e.target.id] = data;
        crowToElp[data] = e.target.id;
        turn = 1;
        crowPlaced++;
      } else if (crowPlaced === 7) {
        const currElp = crowToElp[data];
        // If crow is moving to its adjacent only
        if (
          adjacents[currElp.slice(-1)].includes(parseInt(e.target.id.slice(-1)))
        ) {
          e.target.appendChild(document.getElementById(data));
          elpToCrow[crowToElp[data]] = "";
          elpToCrow[e.target.id] = data;
          crowToElp[data] = e.target.id;
          turn = 1;
        }
      }
    }
    // Vulture Turn
    else if (turn === 1 && data.match(/vulture/g)) {
      if (crowToElp[data] === "") {
        e.target.appendChild(document.getElementById(data));
        elpToCrow[e.target.id] = data;
        crowToElp[data] = e.target.id;
        turn = 0;
      } else {
        const currElp = crowToElp[data];
        // If vulture is moving to its adjacent only
        if (
          adjacents[currElp.slice(-1)].includes(parseInt(e.target.id.slice(-1)))
        ) {
          e.target.appendChild(document.getElementById(data));
          elpToCrow[crowToElp[data]] = "";
          elpToCrow[e.target.id] = data;
          crowToElp[data] = e.target.id;
          turn = 0;
        }
      }
    }
    // console.log(JSON.stringify(elpToCrow));
    // console.log(JSON.stringify(crowToElp));
  }
};
