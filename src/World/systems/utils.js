import { geoInterpolate } from "d3-geo";
import { CubicBezierCurve3, Vector3 } from "three";

const DEGREE_TO_RADIAN = Math.PI / 180;
const EARTH_RADIUS = 200;
const CURVE_MIN_ALTITUDE = 5;
const CURVE_MAX_ALTITUDE = 80;

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

function coordinateToPosition(lat, lon, radius) {
  const phi = (90 - lat) * DEGREE_TO_RADIAN;
  const theta = (lon + 180) * DEGREE_TO_RADIAN;

  return new Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createSplineFromCoords(coords) {
  const [startLat, startLon, endLat, endLon] = coords;

  const startPosition = coordinateToPosition(startLat, startLon, EARTH_RADIUS);
  const endPosition = coordinateToPosition(endLat, endLon, EARTH_RADIUS);
  const altitude = clamp(startPosition.distanceTo(endPosition) * 0.75, CURVE_MIN_ALTITUDE, CURVE_MAX_ALTITUDE);
  const interpolate = geoInterpolate([startLon, startLat], [endLon, endLat]);
  const midCoord1 = interpolate(0.25);
  const midCoord2 = interpolate(0.75);
  const mid1 = coordinateToPosition(midCoord1[1], midCoord1[0], EARTH_RADIUS + altitude);
  const mid2 = coordinateToPosition(midCoord2[1], midCoord2[0], EARTH_RADIUS + altitude);

  return { startPosition, endPosition, spline: new CubicBezierCurve3(startPosition, mid1, mid2, endPosition) };
}

export { createSplineFromCoords };
