import { projectileArray, updateProjectile } from "./projectile.js";
import {
  updateAstroid,
  spawnNewAstroid,
  astroidArray,
  resetDifficulty,
} from "./astroid.js";
import { updateParticle, deleteParticle, particleArray } from "./particle.js";
import { resetCanvas } from "./canvas.js";
import { score } from "./score.js";
import { planet } from "./canvas.js";
import "./input.js";

let myInterval;
let lastTime,
  lost = false;
let modal = document.getElementById("Overlay");

function handleStart() {
  modal.classList.add("hidden");
  // resetDifficulty();
  resetCanvas();
  astroidArray.splice(0, astroidArray.length);
  projectileArray.splice(0, projectileArray.length);
  particleArray.splice(0, particleArray.length);
  console.log(astroidArray.length);
  console.clear();
  score.hiScore = score.fetchHiScore();

  myInterval = setInterval(spawnNewAstroid, 1500);
  requestAnimationFrame(gameLoop);
}

function gameLoop(time) {
  if (lost) return handleLoss();
  if (lastTime == null) {
    lastTime = time;
    requestAnimationFrame(gameLoop);
    return;
  }
  lastTime = time;
  resetCanvas();
  requestAnimationFrame(gameLoop);
  updateProjectile();
  updateAstroid(projectileArray);
  updateParticle();
  deleteParticle();
  hasDied();
}

function handleLoss() {
  astroidArray.splice(0, astroidArray.length);
  projectileArray.splice(0, projectileArray.length);
  score.setDeathScore();
  modal.classList.remove("hidden");
  clearInterval(myInterval);
  score.currentScore = 0;
  lost = false;
  document.addEventListener("click", handleStart, { once: true });
}

document.addEventListener("click", handleStart, { once: true });

function hasDied() {
  astroidArray.forEach((astroid, astroidIndex) => {
    const distance = Math.hypot(planet.x - astroid.x, planet.y - astroid.y);
    if (distance - astroid.radius - planet.radius < 0) {
      lost = true;
      console.log(lost);
    }
  });
}

export function getLost() {
  return lost;
}
