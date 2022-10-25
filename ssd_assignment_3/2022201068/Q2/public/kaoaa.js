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

const confettistart = async () => {
  await tsParticles.load("tsparticles", {
    fullScreen: {
      zIndex: 1,
    },
    particles: {
      color: {
        value: ["#FFFFFF", "#FFd700"],
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        size: true,
        speed: {
          min: 1,
          max: 3,
        },
      },
      number: {
        value: 500,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: false,
          startValue: "max",
          destroy: "min",
          speed: 0.3,
          sync: true,
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
      shape: {
        type: ["circle", "square", "triangle"],
        options: {},
      },
      size: {
        value: {
          min: 2,
          max: 4,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 30,
        },
        enlighten: {
          enable: true,
          value: 30,
        },
        enable: true,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
  });
};

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
let textlog = "Game Started\n";
let mouselog = "dblclick\n";
let gameoveraudio = new Audio("./audio/smb_gameover.wav");
let moveaudio = new Audio("./audio/smb_jump-super.wav");
let deadaudio = new Audio("./audio/smb_vine.wav");

const checkColinear = (targetId) => {
  let elpVul = crowToElp["vulture"].slice(-1);
  targetId = targetId.slice(-1);
  let colarr = colinearMap[elpVul];
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
    textlog += `Crow won the game`;
    const turndiv = document.getElementById("turn");
    turndiv.innerText = "Vulture won!";
    for (let i = 1; i <= 7; i++) {
      const elem = document.getElementById("crow" + i);
      if (elem !== null) {
        elem.removeEventListener("drag", drag, true);
        elem.removeEventListener("drop", drop, true);
        elem.draggable = false;
      }
    }
    const elem = document.getElementById("vulture");
    elem.removeEventListener("drag", drag, true);
    elem.removeEventListener("drop", drop, true);
    elem.draggable = false;
    swal({
      title: "Vulture Won! Caw C-- gulp!",
      text: "Do you want to start new game?",
      buttons: "New Game",
    }).then((e) => {
      if (e) {
        window.location.href = "/";
      }
    });
    confettistart();
    gameoveraudio.play();

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
    textlog += `Crow won the game`;
    const turndiv = document.getElementById("turn");
    turndiv.innerText = "Crow wins!";
    for (let i = 1; i <= 7; i++) {
      const elem = document.getElementById("crow" + i);
      if (elem !== null) {
        elem.removeEventListener("drag", drag, true);
        elem.removeEventListener("drop", drop, true);
        elem.draggable = false;
      }
    }
    const elem = document.getElementById("vulture");
    elem.removeEventListener("drag", drag, true);
    elem.removeEventListener("drop", drop, true);
    elem.draggable = false;
    confettistart();
    swal({
      title: "Crow Won! Caw Caw",
      text: "Do you want to start new game?",
      buttons: "New Game?",
    }).then((e) => {
      if (e) {
        window.location.href = "/";
      }
    });
    gameoveraudio.play();
    return true;
  }
};

const droppable = (e) => {
  e.preventDefault();
};

const drag = (e) => {
  e.dataTransfer.setData("text", e.target.id);
  mouselog += `\n${e.target.id}: dragstart `;
};

const drop = (e) => {
  e.preventDefault();
  mouselog += `\n${e.target.id}: dragstart, drop, `;
  const data = e.dataTransfer.getData("text");

  if (e.target.id in elpToCrow && elpToCrow[e.target.id] === "") {
    // Crow Turn
    if (turn === 0 && data.match(/crow*/g)) {
      if (crowToElp[data] === "") {
        e.target.appendChild(document.getElementById(data));
        moveaudio.play();

        let from = crowToElp[data];
        textlog += `Crow moved from ${
          from === "" ? "Outside" : "Circle " + from.slice(-1)
        } to ${"Circle " + e.target.id.slice(-1)}\n  `;

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
          moveaudio.play();

          let from = crowToElp[data];
          textlog += `Crow moved from ${
            from === "" ? "Outside" : "Circle " + from.slice(-1)
          } to ${"Circle " + e.target.id.slice(-1)}\n`;

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
        moveaudio.play();

        let from = crowToElp[data];
        textlog += `Vulture moved from ${
          from === "" ? "Outside" : "Circle " + from.slice(-1)
        } to ${"Circle " + e.target.id.slice(-1)}\n`;

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
          moveaudio.play();

          let from = crowToElp[data];
          textlog += `Vulture moved from ${
            from === "" ? "Outside" : "Circle " + from.slice(-1)
          } to ${"Circle " + e.target.id.slice(-1)}\n`;

          elpToCrow[crowToElp[data]] = "";
          elpToCrow[e.target.id] = data;
          crowToElp[data] = e.target.id;
          turn = 0;
          const turndiv = document.getElementById("turn");
          turndiv.innerText = "Crow's Turn ↓";
          const scorediv = document.getElementsByClassName("score");
          scorediv[0].innerHTML = `Killed: ${deadCrow}`;
          return;
        }
      }
      // Check Jump
      let adjid = checkColinear(e.target.id);
      if (adjid !== "") {
        e.target.appendChild(document.getElementById(data));
        deadaudio.play();

        let from = crowToElp[data];
        textlog += `Vulture moved from ${
          from === "" ? "Outside" : "Circle " + from.slice(-1)
        } to ${"Circle " + e.target.id.slice(-1)}\n`;

        elpToCrow[crowToElp[data]] = "";
        elpToCrow[e.target.id] = data;
        crowToElp[data] = e.target.id;
        let adjelem = document.getElementById(adjid);
        // console.log({ adjid, adjelem });
        adjelem.innerHTML = "";
        let crowelem = elpToCrow[adjelem.id];
        elpToCrow[adjelem.id] = "";

        delete crowToElp[crowelem];
        turn = 0;
        deadCrow++;
        textlog += `Vulture killed Crow ${crowelem.slice(
          -1
        )}!\nScore is now ${deadCrow}\n`;
      }
    }
    if (turn === 0) {
      const turndiv = document.getElementById("turn");
      turndiv.innerText = "Crow's Turn ↓";
    } else {
      const turndiv = document.getElementById("turn");
      turndiv.innerText = "Vulture's Turn ↑";
    }
    const scorediv = document.getElementsByClassName("score");
    scorediv[0].innerHTML = `Killed: ${deadCrow}`;
    checkGameOver();
  }
};

(function () {
  var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], { type: "text/plain" });

      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

  document.getElementById("downbutton").addEventListener(
    "click",
    function () {
      var link = document.createElement("a");
      link.setAttribute("download", "gameevents.txt");
      textlog += `Download Requested`;
      link.href = makeTextFile(textlog);
      document.body.appendChild(link);

      window.requestAnimationFrame(function () {
        var event = new MouseEvent("click");
        link.dispatchEvent(event);
        document.body.removeChild(link);
      });
    },
    false
  );
})();

(function () {
  var textFile = null,
    makeTextFile = function (text) {
      var data = new Blob([text], { type: "text/plain" });

      if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
      }

      textFile = window.URL.createObjectURL(data);

      return textFile;
    };

  document.getElementById("mousedownload").addEventListener(
    "click",
    function () {
      var link = document.createElement("a");
      link.setAttribute("download", "mousevents.txt");
      mouselog += `\n downbutton: click`;
      link.href = makeTextFile(mouselog);
      document.body.appendChild(link);

      window.requestAnimationFrame(function () {
        var event = new MouseEvent("click");
        link.dispatchEvent(event);
        document.body.removeChild(link);
      });
    },
    false
  );
})();
