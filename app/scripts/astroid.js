import { canvas } from "./canvas.js";
import { ctx } from "./canvas.js";
import { score } from "./score.js";
import { PlanetaryBody } from "./components.js";

export const astroidArray = [];
export class Astroid extends PlanetaryBody {
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

export function spawnNewAstroid() {
  setInterval(() => {
    const radius = Math.floor(Math.random() * 30) + 20;
    let astroidCoordinates = { x: 0, y: 0 };
    if (Math.random() < 0.5) {
      astroidCoordinates.x =
        Math.random() > 0 ? 0 - radius : radius + canvas.width;
      astroidCoordinates.y = Math.random() * canvas.height;
    } else {
      astroidCoordinates.x = Math.random() * canvas.width;
      astroidCoordinates.y =
        Math.random() > 0 ? 0 - radius : radius + canvas.height;
    }
    const color = `hsl(${Math.random() * 360},50%,50%)`;

    const astroidAngle = Math.atan2(
      canvas.height / 2 - astroidCoordinates.y,
      canvas.width / 2 - astroidCoordinates.x
    );
    const astroidVelocity = {
      x: Math.cos(astroidAngle) * 3,
      y: Math.sin(astroidAngle) * 3,
    };
    const astroid = new Astroid(
      astroidCoordinates,
      radius,
      color,
      astroidVelocity
    );
    astroidArray.push(astroid);
  }, 2000);
}

export function updateAstroid(projectileArray) {
  astroidArray.forEach((astroid, astroidIndex) => {
    astroid.travel(ctx);

    projectileArray.forEach((projectile, projectileIndex) => {
      if (
        projectile.x + projectile.radius < 0 ||
        projectile.x - projectile.radius > canvas.width ||
        projectile.y + projectile.radius < 0 ||
        projectile.y - projectile.radius > canvas.height
      ) {
        projectileArray.splice(projectileIndex, 1);
      }
      if (
        astroid.x + astroid.radius < 0 ||
        astroid.x - astroid.radius > canvas.width ||
        astroid.y + astroid.radius < 0 ||
        astroid.y - astroid.radius > canvas.height
      ) {
        astroidArray.splice(astroidIndex, 1);
      }
      const distance = Math.hypot(
        projectile.x - astroid.x,
        projectile.y - astroid.y
      );
      if (distance - astroid.radius - projectile.radius < 0) {
        setTimeout(() => {
          projectileArray.splice(projectileIndex, 1);
          score.scoreUp();
          astroidArray.splice(astroidIndex, 1);
        }, 0);
      }
    });
  });
}
