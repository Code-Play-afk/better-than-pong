import { PlanetaryBody } from "./components.js";
import { center, ctx } from "./canvas.js";

const radius = 5,
  color = "white";
export let projectileArray = [];

export class Projectile extends PlanetaryBody {
  constructor(coordinates, radius, color, velocity) {
    super(coordinates, radius, color);
    this.velocity = velocity;
  }

  travel(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

export function createNewProjectile(projectileVelocity) {
  const projectile = new Projectile(center, radius, color, projectileVelocity);
  projectileArray.push(projectile);
}
export function updateProjectile() {
  projectileArray.forEach((projectile) => {
    projectile.travel(ctx);
  });
}

export function deleteProjectile(projectileIndex) {
  projectileArray.splice(projectileIndex, 1);
}
