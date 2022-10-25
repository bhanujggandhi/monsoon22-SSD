import { useEffect } from "react";

import * as THREE from "three";

import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import SceneInit from "./lib/SceneInit";

import "./App.css";

function App() {
  useEffect(() => {
    const test = new SceneInit("myThreeJsCanvas");
    test.initialize();
    test.animate();

    const fontLoader = new FontLoader();
    const ttfLoader = new TTFLoader();
    ttfLoader.load("fonts/Vampire Wars.ttf", (json) => {
      const vampirefont = fontLoader.parse(json);
      const textGeometry = new TextGeometry("kaoaa", {
        height: 2,
        size: 10,
        font: vampirefont,
      });
      const textMaterial = new THREE.MeshLambertMaterial({ color: 0x801090 });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.x = -30;
      textMesh.position.y = 18;

      test.scene.add(textMesh);

      const ttfLoader2 = new TTFLoader();
      ttfLoader2.load("fonts/karma_suture.ttf", (json) => {
        const ksuture = fontLoader.parse(json);
        const textGeometry2 = new TextGeometry(
          "Double click anywhere to start the game",
          {
            height: 1,
            size: 4,
            font: ksuture,
          }
        );
        const textMaterial2 = new THREE.MeshLambertMaterial({
          color: 0xff8f2f,
        });
        const textMesh2 = new THREE.Mesh(textGeometry2, textMaterial2);
        textMesh2.position.x = -50;
        textMesh2.position.y = -10;

        let isVis = true;
        const animate = () => {
          if (isVis === true) {
            textMesh.position.x += 0.1;
          } else {
            textMesh.position.x -= 0.1;
          }

          window.requestAnimationFrame(animate);
        };
        setInterval(() => {
          isVis = !isVis;
        }, 1000);
        animate();
        test.scene.add(textMesh2);
      });
    });
  }, []);

  return (
    <div>
      <canvas id='myThreeJsCanvas' />
    </div>
  );
}

export default App;
