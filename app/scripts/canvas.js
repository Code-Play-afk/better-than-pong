import { Planet } from "./planet.js";
import { score } from "./score.js";

export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");

canvas.height = innerHeight;
canvas.width = innerWidth;

export const center = { x: canvas.width / 2, y: canvas.height / 2 };

const radius = 15;
const color = "white";
export const planet = new Planet(center, radius, color);

export function resetCanvas() {
  score.setScoreBoard();
  ctx.fillStyle = "rgba(0,0,0,0.1";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  planet.draw(ctx);
}
