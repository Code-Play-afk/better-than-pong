export class PlanetaryBody {
  constructor(coordinates, radius, color, velocity) {
    this.x = coordinates.x;
    this.y = coordinates.y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  travel(ctx) {
    this.draw(ctx);
    this.x += this.velocity.x * 10;
    this.y += this.velocity.y * 10;
  }
}
