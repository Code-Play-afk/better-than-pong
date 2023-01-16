import { canvas } from "./canvas.js";
import { ctx } from "./canvas.js";
import { score } from "./score.js";
import { PlanetaryBody } from "./components.js";
import { deleteProjectile } from "./projectile.js";
import { createNewParticle } from "./particle.js";

export let astroidArray = [];
let difficulty = 2000;
const astroidFriction = 0.99999;
let i = 0;

export class Astroid extends PlanetaryBody {
  constructor(coordinates, radius, color, velocity) {
    super(coordinates, radius, color);
    this.velocity = velocity;
  }

  travel(ctx) {
    this.draw(ctx);
    this.velocity.x *= astroidFriction;
    this.velocity.y *= astroidFriction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

export let spawnNewAstroid = () => {
  const radius = Math.floor(Math.random() * 40) + 20;
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
  console.log("spawn" + i);
  i++;
  astroidArray.push(astroid);
  // if (difficulty >= 500) difficulty -= 10;
};

export function updateAstroid(projectileArray) {
  astroidArray.forEach((astroid, astroidIndex) => {
    astroid.travel(ctx);

    projectileArray.forEach((projectile, projectileIndex) => {
      if (isOutside(astroid)) deleteAstroid(astroidIndex);
      if (isOutside(projectile)) deleteProjectile(projectileIndex);

      if (hasCollided(projectile, astroid)) {
        createNewParticle(projectile, astroid);

        if (astroid.radius - 15 > 5) {
          gsap.to(astroid, { radius: astroid.radius - 15 });
          projectileArray.splice(projectileIndex, 1);
          score.scoreUp();
          setTimeout(() => {
            projectileArray.splice(projectileIndex, 1);
          }, 0);
        } else {
          setTimeout(() => {
            astroidArray.splice(astroidIndex, 1);
            projectileArray.splice(projectileIndex, 1);
            score.scoreUp();
          }, 0);
        }
      }
    });
  });
}

function isOutside(object) {
  return (
    object.x + object.radius < 0 ||
    object.x - object.radius > canvas.width ||
    object.y + object.radius < 0 ||
    object.y - object.radius > canvas.height
  );
}

function hasCollided(body1, body2) {
  const distance = Math.hypot(body1.x - body2.x, body1.y - body2.y);
  return distance - body2.radius - body1.radius < 1;
}

function deleteAstroid(astroidIndex) {
  astroidArray.splice(astroidIndex, 1);
}

export function resetDifficulty() {
  difficulty = 2000;
}
