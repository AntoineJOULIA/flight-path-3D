import { Mesh, MeshPhysicalMaterial, SphereGeometry, TextureLoader } from "three";

function createEarth() {
  const geometry = new SphereGeometry(200, 40, 30);
  const loader = new TextureLoader();
  const material = new MeshPhysicalMaterial({
    map: loader.load("https://i.imgur.com/45naBE9.jpg"),
    color: 0xa58945,
  });
  const earth = new Mesh(geometry, material);

  return earth;
}

export { createEarth };
