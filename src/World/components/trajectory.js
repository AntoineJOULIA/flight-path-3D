import { AdditiveBlending, BufferAttribute, BufferGeometry, Line, LineDashedMaterial, MeshBasicMaterial } from "three";
import { createSplineFromCoords } from "../systems/utils";

const CURVE_SEGMENTS = 32;

function createTrajectory(coords) {
  const geometry = new BufferGeometry();
  const material = new LineDashedMaterial({
    dashSize: 1, // updated in the render loop
    gapSize: 10000, // a big number so only 1 dash is rendered
    blending: AdditiveBlending,
    opacity: 0.6,
    transparent: true,
    color: "skyblue",
  });

  const { spline } = createSplineFromCoords(coords);
  const curveGeometry = new BufferGeometry();
  const points = new Float32Array(CURVE_SEGMENTS * 3);
  const vertices = spline.getPoints(CURVE_SEGMENTS - 1);

  for (let i = 0, j = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    points[j++] = vertex.x;
    points[j++] = vertex.y;
    points[j++] = vertex.z;
  }

  curveGeometry.setAttribute("position", new BufferAttribute(points, 3));
  curveGeometry.setDrawRange(0, CURVE_SEGMENTS);

  const trajectory = new Line(curveGeometry, material);
  trajectory.computeLineDistances();
  const lineLength =
    curveGeometry.attributes.lineDistance.array[curveGeometry.attributes.lineDistance.array.length - 1];

  trajectory.tick = (delta, fraction) => {
    material.dashSize = fraction * lineLength;
  };

  return trajectory;
}

export { createTrajectory };
