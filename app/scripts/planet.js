import { astroidArray } from "./astroid.js";

export class Planet {
  constructor(coordinates, radius, color) {
    this.x = coordinates.x;
    this.y = coordinates.y;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
