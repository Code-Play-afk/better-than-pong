export const score = {
  _hiScore: 0,
  _currentScore: 0,

  set hiScore(points) {
    this._hiScore = points;
  },

  set currentScore(points) {
    this._currentScore = points;
  },

  get hiScore() {
    return this._hiScore;
  },

  get currentScore() {
    return this._currentScore;
  },

  setHiScore(hiScore) {
    const scoreString = JSON.stringify(hiScore);
    localStorage.setItem("hiScore", scoreString);
  },

  fetchHiScore() {
    const scoreObj = JSON.parse(localStorage.getItem("hiScore"));
    if (score === null) return 0;
    else return scoreObj;
  },

  compareScore(points) {
    if (points >= this.hiScore) {
      this.hiScore = points;
      this.setHiScore(this.hiScore);
    }
  },

  scoreUp() {
    this.currentScore++;
    this.compareScore(this.currentScore);
    return this.currentScore;
  },

  setScoreBoard() {
    const bestScore = document.querySelector("[data-hi-score]");
    const currentScore = document.querySelector("[data-current-score]");
    bestScore.innerHTML = `Hi Score:${this.hiScore}`;
    currentScore.innerHTML = `Current Score:${this.currentScore}`;
  },
  setDeathScore() {
    const bestScore = document.getElementById("HiScore");
    const currentScore = document.getElementById("CurrentScore");
    bestScore.innerHTML = `Hi Score:${this.hiScore}`;
    currentScore.innerHTML = `Score:${this.currentScore}`;
  },
};
