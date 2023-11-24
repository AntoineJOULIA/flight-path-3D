import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(30, 1, 1, 10000);
  camera.position.set(0, 500, 500);

  return camera;
}

export { createCamera };
