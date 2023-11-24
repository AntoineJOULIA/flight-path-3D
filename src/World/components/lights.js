import { HemisphereLight } from "three";

function createLights() {
  const light = new HemisphereLight("white", "white", 3);

  return light;
}

export { createLights };
