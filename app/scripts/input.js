import { createNewProjectile } from "./projectile.js";
import { canvas } from "./canvas.js";

export function getClickCoordinates(e) {
  let clickCoordinates = { x: 0, y: 0 };
  clickCoordinates.x = e.clientX;
  clickCoordinates.y = e.clientY;
  return clickCoordinates;
}

export function getAngle(clickCoordinates, canvas) {
  return Math.atan2(
    clickCoordinates.y - canvas.height / 2,
    clickCoordinates.x - canvas.width / 2
  );
}

addEventListener("click", (e) => {
  const clickCoordinates = getClickCoordinates(e);
  const projectileAngle = getAngle(clickCoordinates, canvas);
  const projectileVelocity = {
    x: Math.cos(projectileAngle) * 4,
    y: Math.sin(projectileAngle) * 4,
  };
  createNewProjectile(projectileVelocity);
});
