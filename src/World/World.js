import { createCamera } from "./components/camera";
import { createLights } from "./components/lights";
import { createScene } from "./components/scene";
import { createEarth } from "./components/earth";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";
import { createControls } from "./systems/controls";
import { createTrajectory } from "./components/trajectory";

const cityPairs = [
  [37.77397, -122.43129, 22.54554, 114.0683],
  [47.77397, -110.43129, 22.54554, 114.0683],
  [48.72333, 2.37944, 43.6291, 1.36382],
];

let camera;
let renderer;
let scene;
let loop;
let controls;

class World {
  constructor(container) {
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    controls = createControls(camera, renderer.domElement);
    loop.updatables.push(controls);

    const light = createLights();
    scene.add(light);

    const earth = createEarth();
    scene.add(earth);

    for (const cityPair of cityPairs) {
      const trajectory = createTrajectory(cityPair);
      scene.add(trajectory);
      loop.updatables.push(trajectory);
    }

    const resizer = new Resizer(container, camera, renderer);
    resizer.onResize = () => {
      this.render();
    };
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
