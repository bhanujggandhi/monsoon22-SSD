// import Three from './three';
// import Three,{init} from './world';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "dat.gui";
import { useEffect, useState } from "react";
import "./index.css";

var canvas, scene, renderer, camera;

var raycaster; // A THREE.Raycaster for user mouse input.

var ground; // A square base on which the cylinders stand.
var cylinder; // A cylinder that will be cloned to make the visible cylinders.
var vultureCylinder;

var world; // An Object3D that contains all the mesh objects in the scene.
// Rotation of the scene is done by rotating the world about its
// y-axis.  (I couldn't rotate the camera about the scene since
// the Raycaster wouldn't work with a camera that was a child
// of a rotated object.)

var controls;

var ROTATE = 1,
  DRAG = 2,
  ADD = 3,
  DELETE = 4; // Possible mouse actions
var mouseAction; // currently selected mouse action
var dragItem; // the cylinder that is being dragged, during a drag operation
var intersects; //the objects intersected

var targetForDragging; // An invisible object that is used as the target for raycasting while
// dragging a cylinder.  I use it to find the new location of the
// cylinder.  I tried using the ground for this purpose, but to get
// the motion right, I needed a target that is at the same height
// above the ground as the point where the user clicked the cylinder.

var pointA = {
  id: "A",
  x: 0,
  y: -16,
  adj: ["C", "D"],
  adjSq: ["F-C", "G-D"],
};
var pointB = {
  id: "B",
  x: -16,
  y: -4,
  adj: ["C", "F"],
  adjSq: ["D-C", "H-F"],
};
var pointC = {
  id: "C",
  x: -6,
  y: -4,
  adj: ["A", "B", "F", "D"],
  adjSq: ["I-F", "E-D"],
};
var pointD = {
  id: "D",
  x: 6,
  y: -4,
  adj: ["A", "C", "G", "E"],
  adjSq: ["B-C", "J-G"],
};
var pointE = {
  id: "E",
  x: 16,
  y: -4,
  adj: ["D", "G"],
  adjSq: ["C-D", "H-G"],
};
var pointF = {
  id: "F",
  x: -8.5,
  y: 1,
  adj: ["B", "C", "I", "H"],
  adjSq: ["A-C", "J-H"],
};
var pointG = {
  id: "G",
  x: 8.5,
  y: 1,
  adj: ["D", "E", "H", "J"],
  adjSq: ["A-D", "I-H"],
};
var pointH = {
  id: "H",
  x: 0,
  y: 6,
  adj: ["F", "G", "I", "J"],
  adjSq: ["B-F", "E-G"],
};
var pointI = {
  id: "I",
  x: -16,
  y: 16,
  adj: ["F", "H"],
  adjSq: ["C-F", "G-H"],
};
var pointJ = {
  id: "J",
  x: 16,
  y: 16,
  adj: ["H", "G"],
  adjSq: ["F-H", "D-G"],
};

var pointK = { x: -16, y: 24 };
var pointL = { x: -14, y: 24 };
var pointM = { x: -12, y: 24 };
var pointN = { x: 0, y: 24 };
var pointO = { x: 12, y: 24 };
var pointP = { x: 14, y: 24 };
var pointQ = { x: 16, y: 24 };
var pointR = { x: 0, y: 18 };
var pointS = { x: 0, y: -24 };

const STATES = {
  READY: 0,
  RUNNING: 1,
  DEAD: 2,
};

var restingPoints = [pointK, pointL, pointM, pointN, pointO, pointP, pointQ];
var playingPoints = [
  pointA,
  pointB,
  pointC,
  pointD,
  pointE,
  pointF,
  pointG,
  pointH,
  pointI,
  pointJ,
];

var vulture;
var crow0, crow1, crow2, crow3, crow4, crow5, crow6;

var vulture = {
  position: pointR,
  meshId: "",
  state: STATES.READY,
};

var crow0 = {
  position: restingPoints[0],
  meshId: "",
  state: STATES.READY,
};
var crow1 = {
  position: restingPoints[1],
  meshId: "",
  state: STATES.READY,
};
var crow2 = {
  position: restingPoints[2],
  meshId: "",
  state: STATES.READY,
};
var crow3 = {
  position: restingPoints[3],
  meshId: "",
  state: STATES.READY,
};
var crow4 = {
  position: restingPoints[4],
  meshId: "",
  state: STATES.READY,
};
var crow5 = {
  position: restingPoints[5],
  meshId: "",
  state: STATES.READY,
};
var crow6 = {
  position: restingPoints[6],
  meshId: "",
  state: STATES.READY,
};

var crows = [crow0, crow1, crow2, crow3, crow4, crow5, crow6];

const TURN = {
  CROW: 0,
  VULTURE: 1,
};
let turn = TURN.CROW;
let ALL_CROWS_ONCE_ON_BOARD = false;
let GAME_OVER = 0;

function App() {
  const [gameOver, setGameOver] = useState(GAME_OVER);

  function render() {
    renderer.render(scene, camera);
    // controls.update();
  }

  function createWorld() {
    scene = new THREE.Scene();
    // renderer.setClearColor(0x333333);
    camera = new THREE.PerspectiveCamera(
      35,
      canvas.width / canvas.height,
      10,
      100
    );
    camera.position.z = 60;
    camera.position.y = 30;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.add(new THREE.PointLight(0xffffff, 0.7)); // point light at camera position
    scene.add(camera);
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5)); // light shining from above.

    world = new THREE.Object3D();
    scene.add(world);

    ground = new THREE.Mesh(
      new THREE.BoxGeometry(40, 1, 40),
      new THREE.MeshLambertMaterial({ color: 111100 })
    );
    ground.position.y = -1; // top of base lies in the plane y = -5;
    world.add(ground);

    targetForDragging = new THREE.Mesh(
      new THREE.BoxGeometry(100, 0.01, 100),
      new THREE.MeshBasicMaterial()
    );
    targetForDragging.material.visible = false;

    // targetForDragging.material.transparent = true;  // This was used for debugging
    // targetForDragging.material.opacity = 0.1;
    // world.add(targetForDragging);

    cylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1, 16, 32),
      new THREE.MeshLambertMaterial({ color: 121266 })
    );
    cylinder.position.y = 0; // places base at y = 0;

    crows = crows.map((crow) => {
      const uuid = addCylinder(crow.position);
      return { ...crow, meshId: uuid };
    });

    vultureCylinder = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1, 16, 32),
      new THREE.MeshLambertMaterial({ color: "red" })
    );
    vultureCylinder.position.y = 0; // places base at y = 0;
    vultureCylinder.position.x = pointR.x;
    vultureCylinder.position.z = pointR.y;
    world.add(vultureCylinder);
    vulture.meshId = vultureCylinder.uuid;

    drawStar();
    // controls = new OrbitControls(camera,renderer.domElement)
    // controls.addEventListener( 'change', ()=>{renderer.render(scene, camera)} );
  }

  function drawStar() {
    const y = 0;
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x11ff00 });
    const points1 = [];
    points1.push(new THREE.Vector3(pointJ.x, y, pointJ.y));
    points1.push(new THREE.Vector3(pointB.x, y, pointB.y));
    const lineGeometry1 = new THREE.BufferGeometry().setFromPoints(points1);
    const lines1 = new THREE.Line(lineGeometry1, lineMaterial);
    scene.add(lines1);

    const points2 = [];
    points2.push(new THREE.Vector3(pointI.x, y, pointI.y));
    points2.push(new THREE.Vector3(pointA.x, y, pointA.y));
    const lineGeometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    const lines2 = new THREE.Line(lineGeometry2, lineMaterial);
    scene.add(lines2);

    const points3 = [];
    points3.push(new THREE.Vector3(pointA.x, y, pointA.y));
    points3.push(new THREE.Vector3(pointJ.x, y, pointJ.y));
    const lineGeometry3 = new THREE.BufferGeometry().setFromPoints(points3);
    const lines3 = new THREE.Line(lineGeometry3, lineMaterial);
    scene.add(lines3);

    const points4 = [];
    points4.push(new THREE.Vector3(pointI.x, y, pointI.y));
    points4.push(new THREE.Vector3(pointE.x, y, pointE.y));
    const lineGeometry4 = new THREE.BufferGeometry().setFromPoints(points4);
    const lines4 = new THREE.Line(lineGeometry4, lineMaterial);
    scene.add(lines4);

    const points5 = [];
    points5.push(new THREE.Vector3(pointE.x, y, pointE.y));
    points5.push(new THREE.Vector3(pointB.x, y, pointB.y));
    const lineGeometry5 = new THREE.BufferGeometry().setFromPoints(points5);
    const lines5 = new THREE.Line(lineGeometry5, lineMaterial);
    scene.add(lines5);
  }

  function addCylinder(point) {
    var obj = cylinder.clone();
    obj.position.x = point.x;
    obj.position.z = point.y;
    world.add(obj);
    return obj.uuid;
  }

  function getClosestPoint(x, y) {
    var cp = -1;
    playingPoints.forEach((pt) => {
      if (x >= pt.x - 1 && x <= pt.x + 1 && y >= pt.y - 1 && y <= pt.y + 1) {
        cp = pt;
        return;
      }
    });
    return cp;
  }

  function resetMove(oldx, oldy, message = "", el = dragItem) {
    el.position.set(oldx, 0, oldy);
    render();
    console.error(message);
  }

  function checkIfCrowWins() {
    const runningCrows = crows.filter((crow) => crow.state === STATES.RUNNING);
    if (vulture.state !== STATES.RUNNING) {
      return false;
    }
    return (
      vulture.position.adj.every((pt) => {
        return runningCrows.some((crow) => crow.position.id == pt);
      }) &&
      vulture.position.adjSq.every((pt) => {
        return runningCrows.some(
          (crow) => crow.position.id == pt.split("-")[0]
        );
      })
    );
  }

  function checkIfVultureWins() {
    return crows.every((crow) => crow.state === STATES.DEAD);
  }

  function handleVultureMovt(x, y, vulture) {
    const closestPoint = getClosestPoint(x, y);
    if (closestPoint == -1) {
      resetMove(
        vulture.position.x,
        vulture.position.y,
        "Invalid point: Try to place near the point" + x + " " + y
      );
      return false;
    }

    var empty = true;
    if (
      vulture.position.id === closestPoint.id ||
      crows
        .filter((crow) => crow.state === STATES.RUNNING)
        .some((cr) => cr.position.id === closestPoint.id)
    ) {
      empty = false;
    }
    if (!empty) {
      resetMove(
        vulture.position.x,
        vulture.position.y,
        "Invalid move: Cant have two body at same place"
      );
      return false;
    }

    const validAdjPoint =
      vulture.state != STATES.READY
        ? vulture.position.adj.findIndex((id) => id == closestPoint.id) > -1
        : true;
    if (!validAdjPoint) {
      let validAdjSqPoint = false;
      let validAdjSqPointIdx = vulture.position.adjSq.findIndex(
        (id) => id.split("-")[0] === closestPoint.id
      );
      let intermediate;
      let killedCrowIdx;
      if (validAdjSqPointIdx > -1) {
        intermediate = vulture.position.adjSq[validAdjSqPointIdx].split("-")[1];
        killedCrowIdx = crows.findIndex(
          (crow) =>
            crow.state === STATES.RUNNING && crow.position.id === intermediate
        );
        if (killedCrowIdx > -1) {
          validAdjSqPoint = true;
        }
      }
      if (!validAdjSqPoint) {
        resetMove(
          vulture.position.x,
          vulture.position.y,
          "Invalid move: Vulture can only move to adjacent point in straight line or kill"
        );
        return false;
      } else {
        const idx = world.children.findIndex(
          (ch) => ch.uuid === crows[killedCrowIdx].meshId
        );
        if (idx > -1) {
          world.children[idx].position.set(pointS.x, 0, pointS.y);
          vulture.position = closestPoint;
          crows[killedCrowIdx].state = STATES.DEAD;
          crows[killedCrowIdx].position = pointS;
          render();
          if (checkIfVultureWins()) {
            alert("VULTURE WINS!");
            setGameOver(1);
          }
          return true;
        } else {
          console.log("Something went wrong while killing!");
          return false;
        }
      }
    }
    vulture.position = closestPoint;
    if (vulture.state == STATES.READY) {
      vulture.state = STATES.RUNNING;
    }
    return true;
  }

  function handleCrowMovt(x, y, crow) {
    if (!ALL_CROWS_ONCE_ON_BOARD && crow.state == STATES.RUNNING) {
      if (crows.findIndex((crow) => crow.state === STATES.READY) > -1) {
        resetMove(
          crow.position.x,
          crow.position.y,
          "Invalid move: Can't move running  crow twice until every crow is on the board"
        );
        return false;
      } else {
        ALL_CROWS_ONCE_ON_BOARD = true;
      }
    }

    const closestPoint = getClosestPoint(x, y);
    if (closestPoint == -1) {
      resetMove(
        crow.position.x,
        crow.position.y,
        "Invalid point: Try to place near the point" + x + " " + y
      );
      return false;
    }
    var empty = true;
    if (
      vulture.position.id === closestPoint.id ||
      crows
        .filter((crow) => crow.state === STATES.RUNNING)
        .some((cr) => cr.position.id === closestPoint.id)
    ) {
      empty = false;
    }
    if (!empty) {
      resetMove(
        crow.position.x,
        crow.position.y,
        "Invalid move: Cant have two body at same place"
      );
      return false;
    }
    const validPoint =
      crow.state != STATES.READY
        ? crow.position.adj.findIndex((id) => id == closestPoint.id) > -1
        : true;
    if (!validPoint) {
      resetMove(
        crow.position.x,
        crow.position.y,
        "Invalid move: Crows can only move to adjacent point in straight line"
      );
      return false;
    }
    crow.position = closestPoint;
    if (crow.state == STATES.READY) {
      crow.state = STATES.RUNNING;
    }
    if (checkIfCrowWins()) {
      setGameOver(1);
      console.log("CROW WINS!!");
    }
    return true;
  }

  function handleDrop(x, y, id) {
    if (gameOver) {
      // init();
      return;
    }
    if (id == vulture.meshId) {
      if (turn == TURN.VULTURE) {
        if (handleVultureMovt(x, y, vulture)) {
          turn = TURN.CROW;
        }
      } else {
        resetMove(
          vulture.position.x,
          vulture.position.y,
          "Invalid move: Crows turn"
        );
      }
    } else {
      const index = crows.findIndex((crow) => crow.meshId === id);
      if (crows[index].state === STATES.DEAD) {
        resetMove(
          crows[index].position.x,
          crows[index].position.y,
          "Invalid move: Dead crow cant move"
        );
        return;
      }
      if (turn == TURN.CROW) {
        if (index > -1) {
          if (handleCrowMovt(x, y, crows[index])) {
            turn = TURN.VULTURE;
          }
        }
      } else {
        resetMove(
          crows[index].position.x,
          crows[index].position.y,
          "Invalid move: Vultures turn"
        );
      }
    }
  }

  function doMouseDown(x, y) {
    if (mouseAction == ROTATE) {
      return true;
    }
    if (targetForDragging.parent == world) {
      world.remove(targetForDragging); // Don't want to check for hits on targetForDragging
    }
    var a = (2 * x) / canvas.width - 1;
    var b = 1 - (2 * y) / canvas.height;
    raycaster.setFromCamera(new THREE.Vector2(a, b), camera);
    intersects = raycaster.intersectObjects(world.children); // no need for recusion since all objects are top-level
    if (intersects.length == 0) {
      return false;
    }
    var item = intersects[0];
    var objectHit = item.object;
    switch (mouseAction) {
      case DRAG:
        if (objectHit == ground) {
          return false;
        } else {
          dragItem = objectHit;
          world.add(targetForDragging);
          targetForDragging.position.set(0, item.point.y, 0);
          render();
          return true;
        }
    }
  }

  function doMouseMove(x, y, evt, prevX, prevY) {
    if (mouseAction == ROTATE) {
      var dx = x - prevX;
      world.rotateY(dx / 200);
      render();
    } else {
      // drag
      var a = (2 * x) / canvas.width - 1;
      var b = 1 - (2 * y) / canvas.height;
      raycaster.setFromCamera(new THREE.Vector2(a, b), camera);
      intersects = raycaster.intersectObject(targetForDragging);
      if (intersects.length == 0) {
        return;
      }
      var locationX = intersects[0].point.x;
      var locationZ = intersects[0].point.z;
      var coords = new THREE.Vector3(locationX, 0, locationZ);
      world.worldToLocal(coords);
      a = Math.min(18, Math.max(-18, coords.x));
      b = Math.min(18, Math.max(-18, coords.z));
      dragItem.position.set(a, 0, b);
      render();
    }
  }

  function doMouseUp(x, y, evt, prevX, prevY, startX, startY) {
    var a = (2 * x) / canvas.width - 1;
    var b = 1 - (2 * y) / canvas.height;
    raycaster.setFromCamera(new THREE.Vector2(a, b), camera);
    intersects = raycaster.intersectObject(targetForDragging);
    if (intersects.length == 0) {
      return;
    }
    var locationX = intersects[0].point.x;
    var locationZ = intersects[0].point.z;
    var coords = new THREE.Vector3(locationX, 0, locationZ);
    // world.worldToLocal(coords);
    a = Math.min(16, Math.max(-16, coords.x));
    b = Math.min(22, Math.max(-16, coords.z));
    handleDrop(a, b, dragItem.uuid);
  }

  function setUpMouseHander(
    element,
    mouseDownFunc,
    mouseDragFunc,
    mouseUpFunc
  ) {
    if (!element || !mouseDownFunc || !(typeof mouseDownFunc == "function")) {
      throw "Illegal arguments in setUpMouseHander";
    }
    if (typeof element == "string") {
      element = document.getElementById(element);
    }
    if (!element || !element.addEventListener) {
      throw "first argument in setUpMouseHander is not a valid element";
    }
    var dragging = false;
    var startX, startY;
    var prevX, prevY;

    function doMouseDown(evt) {
      if (dragging) {
        return;
      }
      var r = element.getBoundingClientRect();
      var x = evt.clientX - r.left;
      var y = evt.clientY - r.top;
      prevX = startX = x;
      prevY = startY = y;
      dragging = mouseDownFunc(x, y, evt);
      if (dragging) {
        document.addEventListener("mousemove", doMouseMove);
        document.addEventListener("mouseup", doMouseUp);
      }
    }

    function doMouseMove(evt) {
      if (dragging) {
        if (mouseDragFunc) {
          var r = element.getBoundingClientRect();
          var x = evt.clientX - r.left;
          var y = evt.clientY - r.top;
          mouseDragFunc(x, y, evt, prevX, prevY, startX, startY);
        }
        prevX = x;
        prevY = y;
      }
    }

    function doMouseUp(evt) {
      if (dragging) {
        document.removeEventListener("mousemove", doMouseMove);
        document.removeEventListener("mouseup", doMouseUp);
        if (mouseUpFunc) {
          var r = element.getBoundingClientRect();
          var x = evt.clientX - r.left;
          var y = evt.clientY - r.top;
          mouseUpFunc(x, y, evt, prevX, prevY, startX, startY);
        }
        dragging = false;
      }
    }
    element.addEventListener("mousedown", doMouseDown);
  }

  // function doChangeMouseAction() {
  //     if (document.getElementById("mouseRotate").checked) {
  //         mouseAction = ROTATE;
  //     }
  //     else if (document.getElementById("mouseDrag").checked) {
  //         mouseAction = DRAG;
  //     }
  //     // else if (document.getElementById("mouseAdd").checked) {
  //     //     mouseAction = ADD;
  //     // }
  //     // else {
  //     //     mouseAction = DELETE;
  //     // }
  // }

  function init() {
    try {
      canvas = document.getElementById("maincanvas");
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
      });
    } catch (e) {
      document.getElementById("canvas-holder").innerHTML =
        "<p><b>Sorry, an error occurred:<br>" + e + "</b></p>";
      return;
    }
    document.getElementById("mouseDrag").checked = true;
    mouseAction = DRAG;
    // document.getElementById("mouseRotate").onchange = doChangeMouseAction;
    // document.getElementById("mouseDrag").onchange = doChangeMouseAction;
    // document.getElementById("mouseAdd").onchange = doChangeMouseAction;
    // document.getElementById("mouseDelete").onchange = doChangeMouseAction;
    createWorld();
    setUpMouseHander(canvas, doMouseDown, doMouseMove, doMouseUp);
    // setUpTouchHander(canvas,doMouseDown,doMouseMove);
    raycaster = new THREE.Raycaster();
    render();
  }

  useEffect(() => init(), []);
  return (
    <div className='App'>
      <div id='content'>
        <p>
          <b>Mouse Action:</b>
          <label>
            <input type='radio' name='action' id='mouseDrag' />
            Drag
          </label>
          <label>
            <input type='radio' name='action' id='mouseRotate' />
            Rotate
          </label>
          {/* <label><input type="radio" name="action" id="mouseAdd" />Add</label>
        <label><input type="radio" name="action" id="mouseDelete" />Delete</label> */}
        </p>
        <div id='canvas-holder'>
          <canvas id='maincanvas' width='960' height='720'></canvas>
        </div>
      </div>
      <div id='grand'></div>
    </div>
  );
}

export default App;
