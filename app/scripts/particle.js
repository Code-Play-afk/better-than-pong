import { PlanetaryBody } from "./components.js";
import { ctx } from "./canvas.js";

const particleFriction = 0.99;
const particleArray = [];

export class Particle extends PlanetaryBody {
  constructor(coordinates, radius, color, velocity) {
    super(coordinates, radius, color);
    this.velocity = velocity;
    this.alpha = 1;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
  travel(ctx) {
    this.draw(ctx);
    this.velocity.x *= particleFriction;
    this.velocity.y *= particleFriction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.01;
  }
}

export function createNewParticle(projectile, astroid) {
  for (let i = 0; i < astroid.radius * 2; i++) {
    particleArray.push(
      new Particle(
        {
          x: projectile.x,
          y: projectile.y,
        },
        Math.random() * 2,
        astroid.color,
        {
          x: (Math.random() - 0.5) * Math.random() * 6,
          y: (Math.random() - 0.5) * Math.random() * 6,
        }
      )
    );
  }
}

export function updateParticle() {
  particleArray.forEach((particle) => {
    particle.travel(ctx);
  });
}

export function deleteParticle() {
  particleArray.forEach((particle, index) => {
    if (particle.alpha <= 0) particleArray.splice(index, 1);
  });
}
