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

const colinearMap = {
  0: [
    [1, 3],
    [7, 8],
  ],
  1: [
    [7, 6],
    [3, 4],
  ],
  2: [
    [1, 7],
    [3, 9],
  ],
  3: [
    [1, 0],
    [9, 5],
  ],
  4: [
    [3, 1],
    [9, 8],
  ],
  5: [
    [9, 3],
    [8, 7],
  ],
  6: [
    [8, 9],
    [7, 1],
  ],
  7: [
    [1, 2],
    [8, 5],
  ],
  8: [
    [9, 4],
    [7, 0],
  ],
  9: [
    [3, 2],
    [8, 6],
  ],
};

let turn = 0;
let crowPlaced = 0;
let deadCrow = 0;

const checkColinear = (targetId) => {
  // console.log({
  //   vulatelp: crowToElp["vulture"],
  //   targetId: targetId,
  // });
  let elpVul = crowToElp["vulture"].slice(-1);
  targetId = targetId.slice(-1);
  let colarr = colinearMap[elpVul];
  // console.log(colarr);
  for (let i = 0; i < colarr.length; i++) {
    if (colarr[i][1] === parseInt(targetId)) {
      let elpidOcc = "elp" + colarr[i][0];
      console.log(elpidOcc);
      if (elpToCrow[elpidOcc] !== "") {
        return elpidOcc;
      }
    }
  }
  return "";
};

const checkGameOver = () => {
  if (deadCrow === 4) {
    alert("Vulture Wins Game over");
    return true;
  } else {
    let vulturePos = crowToElp["vulture"];
    if (vulturePos) {
      let adjacentToVulture = adjacents[vulturePos.slice(-1)];
      for (let i = 0; i < adjacentToVulture.length; i++) {
        let elpId = "elp" + adjacentToVulture[i];
        if (elpToCrow[elpId] === "") return false;
      }
      let colinearToVulture = colinearMap[vulturePos.slice(-1)];
      for (let i = 0; i < colinearToVulture.length; i++) {
        if (elpToCrow["elp" + colinearToVulture[i][1]] === "") return false;
      }
    }
    if (vulturePos === "") return false;
    return true;
  }
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
          return;
        }
      }
      // Check Jump
      let adjid = checkColinear(e.target.id);
      if (adjid !== "") {
        e.target.appendChild(document.getElementById(data));
        elpToCrow[crowToElp[data]] = "";
        elpToCrow[e.target.id] = data;
        crowToElp[data] = e.target.id;
        let adjelem = document.getElementById(adjid);
        console.log({ adjid, adjelem });
        adjelem.innerHTML = "";
        let crowelem = elpToCrow[adjelem.id];
        elpToCrow[adjelem.id] = "";
        delete crowToElp[crowelem];
        turn = 0;
        deadCrow++;
      }
    }
    console.log(checkGameOver());
    if (checkGameOver()) {
      alert("Game Over");
    }
  }
};
