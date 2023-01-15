import { projectileArray, updateProjectile } from "./projectile.js";
import { updateAstroid, spawnNewAstroid, astroidArray } from "./astroid.js";
import { resetCanvas } from "./canvas.js";
import { score } from "./score.js";
import { planet } from "./canvas.js";
import "./input.js";

let lastTime,
  lost = false;
const modal = document.getElementById("Overlay");

function handleStart() {
  console.log("This is start");
  modal.classList.add("hidden");
  resetCanvas();
  score.hiScore = score.fetchHiScore();
  requestAnimationFrame(gameLoop);
  if (!lost) spawnNewAstroid();
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
  hasDied();
}

function handleLoss() {
  astroidArray.splice(0, astroidArray.length);
  projectileArray.splice(0, projectileArray.length);
  score.setDeathScore();
  modal.classList.remove("hidden");
  score.currentScore = 0;
  setTimeout(() => {
    document.addEventListener("click", handleStart, {
      once: true,
    });
  }, 1000);
}

addEventListener(
  "click",
  () => {
    handleStart();
  },
  { once: true }
);

function hasDied() {
  astroidArray.forEach((astroid, astroidIndex) => {
    const distance = Math.hypot(planet.x - astroid.x, planet.y - astroid.y);
    if (distance - astroid.radius - planet.radius < 0) {
      lost = true;
      console.log(lost);
    }
  });
}
