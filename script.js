const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const fruit = document.getElementById("fruit");
const gift = document.getElementById("gift");
const scoreDisplay = document.getElementById("score");
const birthdayCard = document.getElementById("birthday-card");
const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");

// 音效元素
const jumpSound = document.getElementById("jump-sound");
const fruitSound = document.getElementById("fruit-sound");
const HBDSound = document.getElementById("HBD-sound");
const backgroundMusic = document.getElementById("background-music");

let cake = null;
let score = 0;
let isGameOver = false;
let fruitActive = true;
let giftActive = true;
let gameInterval;
let obstacleInterval;

window.onload = () => {
  backgroundMusic.play();
  backgroundMusic.volume = 0.2;
  checkOrientation(); // 檢查螢幕方向
};
startButton.addEventListener("click", startGame);

function startGame() {
  fruitSound.currentTime = 0;
  fruitSound.play();
  startScreen.style.display = "none";
  document.getElementById("game-container").style.display = "block";
  gameInterval = setInterval(checkCollision, 10);
  startObstacleAnimation();
}

document.addEventListener("keydown", function (event) {
  if (event.code === "Space" && !isGameOver) {
    jump();
  }
});
document.addEventListener("touchstart", () => {
  if (!isGameOver) {
    jump();
  }
});

function jump() {
  let isJumping = true;
  let position = 0;
  jumpSound.currentTime = 0;
  jumpSound.play();
  jumpSound.volume = 0.5;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 5;
          player.style.bottom = position + "px";
        }
      }, 15);
    } else {
      position += 5;
      player.style.bottom = position + "px";
    }
  }, 15);
}

function updateScore(amount) {
  if (isGameOver) return;

  score += amount;
  if (score >= 1015) {
    score = 1015;
    spawnCake();
  }
  scoreDisplay.textContent = `Score: ${score}`;
}

function spawnCake() {
  if (cake) return;

  cake = document.createElement("div");
  cake.id = "cake";
  cake.innerHTML = `<img src="cake.png" alt="Cake" />`;
  cake.style.bottom = "0px";
  cake.style.right = "-50px";
  cake.style.width = "130px";
  cake.style.height = "130px";
  cake.style.animation = "moveObstacle 3s linear infinite";
  document.getElementById("game-container").appendChild(cake);

  stopObstacle(); // 停止障礙物移動
}

function startObstacleAnimation() {
  obstacle.style.right = "-50px";
  obstacleInterval = setInterval(() => {
    let right = parseInt(obstacle.style.right) || 0;
    obstacle.style.right = right + 2 + "px";

    if (right >= 800) {
      obstacle.style.right = "-50px";
    }
  }, 0.00000001);
}

function stopObstacle() {
  clearInterval(obstacleInterval);
  obstacle.style.display = "none";
}

function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  const fruitRect = fruit.getBoundingClientRect();
  const giftRect = gift.getBoundingClientRect();

  if (
    playerRect.right > obstacleRect.left &&
    playerRect.left < obstacleRect.right &&
    playerRect.bottom > obstacleRect.top
  ) {
    backgroundMusic.pause();
    endGame("Game Over!");
  }

  if (
    fruitActive &&
    playerRect.right > fruitRect.left &&
    playerRect.left < fruitRect.right &&
    playerRect.top < fruitRect.bottom
  ) {
    // 播放吃果實音效
    fruitSound.currentTime = 0;
    fruitSound.play();
    updateScore(175);
    fruitActive = false;
    resetFruit();
  }

  if (
    giftActive &&
    playerRect.right > giftRect.left &&
    playerRect.left < giftRect.right &&
    playerRect.top < giftRect.bottom
  ) {
    fruitSound.currentTime = 0;
    fruitSound.play();
    updateScore(145);
    giftActive = false;
    resetGift();
  }

  if (cake) {
    const cakeRect = cake.getBoundingClientRect();
    if (
      playerRect.right > cakeRect.left &&
      playerRect.left < cakeRect.right &&
      playerRect.bottom > cakeRect.top
    ) {
      showBirthdayCard();
    }
  }
}

function resetFruit() {
  if (isGameOver) return;
  fruit.style.display = "none";
  setTimeout(() => {
    if (!isGameOver) {
      fruit.style.right = "-50px";
      fruit.style.top = `${Math.random() * 100 + 50}px`;
      fruit.style.display = "block";
      fruitActive = true;
    }
  }, 1000);
}

function resetGift() {
  if (isGameOver) return;
  gift.style.display = "none";
  setTimeout(() => {
    if (!isGameOver) {
      gift.style.right = "-50px";
      gift.style.top = `${Math.random() * 100 + 50}px`;
      gift.style.display = "block";
      giftActive = true;
    }
  }, 5000);
}

function showBirthdayCard() {
  backgroundMusic.pause();
  HBDSound.currentTime = 0;
  HBDSound.play();
  isGameOver = true;
  clearInterval(gameInterval);
  birthdayCard.classList.remove("hidden");
  cake.style.display = "none";
  obstacle.style.display = "none";
  fruit.style.display = "none";
  gift.style.display = "none";
}

function endGame(message) {
  isGameOver = true;
  clearInterval(gameInterval);
  alert(message);
  location.reload();
}

function reloadGame() {
  location.reload();
}
// 強制螢幕為橫向模式
function checkOrientation() {
  if (window.innerWidth < window.innerHeight) {
    alert("請將裝置旋轉至橫向！");
  }
}

window.addEventListener("orientationchange", checkOrientation);

// const player = document.getElementById("player");
// const obstacle = document.getElementById("obstacle");
// const fruit = document.getElementById("fruit");
// const gift = document.getElementById("gift");
// const scoreDisplay = document.getElementById("score");
// const birthdayCard = document.getElementById("birthday-card");
// const startScreen = document.getElementById("start-screen");
// const startButton = document.getElementById("start-button");

// // 音效元素
// const jumpSound = document.getElementById("jump-sound");
// const fruitSound = document.getElementById("fruit-sound");
// const HBDSound = document.getElementById("HBD-sound");
// const backgroundMusic = document.getElementById("background-music");

// let cake = null;
// let score = 0;
// let isGameOver = false;
// let fruitActive = true;
// let giftActive = true;
// let gameInterval;
// let obstacleInterval;

// window.onload = () => {
//   backgroundMusic.play();
//   backgroundMusic.volume = 0.2;
//   checkOrientation(); // 檢查螢幕方向
// };
// startButton.addEventListener("click", startGame);

// // 增加鍵盤及觸控跳躍事件
// document.addEventListener("keydown", (event) => {
//   if (event.code === "Space" && !isGameOver) {
//     jump();
//   }
// });
// document.addEventListener("touchstart", () => {
//   if (!isGameOver) {
//     jump();
//   }
// });

// function startGame() {
//   fruitSound.currentTime = 0;
//   fruitSound.play();
//   startScreen.style.display = "none";
//   document.getElementById("game-container").style.display = "block";
//   gameInterval = setInterval(checkCollision, 10);
//   startObstacleAnimation();
// }

// function jump() {
//   let isJumping = true;
//   let position = 0;
//   jumpSound.currentTime = 0;
//   jumpSound.play();
//   jumpSound.volume = 0.5;

//   let upInterval = setInterval(() => {
//     if (position >= 150) {
//       clearInterval(upInterval);

//       let downInterval = setInterval(() => {
//         if (position <= 0) {
//           clearInterval(downInterval);
//           isJumping = false;
//         } else {
//           position -= 5;
//           player.style.bottom = position + "px";
//         }
//       }, 15);
//     } else {
//       position += 5;
//       player.style.bottom = position + "px";
//     }
//   }, 15);
// }

// function updateScore(amount) {
//   if (isGameOver) return;

//   score += amount;
//   if (score >= 1015) {
//     score = 1015;
//     spawnCake();
//   }
//   scoreDisplay.textContent = `分數: ${score}`;
// }

// function spawnCake() {
//   if (cake) return;

//   cake = document.createElement("div");
//   cake.id = "cake";
//   cake.innerHTML = `<img src="cake.png" alt="Cake" />`;
//   cake.style.bottom = "0px";
//   cake.style.right = "-50px";
//   cake.style.width = "130px";
//   cake.style.height = "130px";
//   cake.style.animation = "moveObstacle 3s linear infinite";
//   document.getElementById("game-container").appendChild(cake);

//   stopObstacle(); // 停止障礙物移動
// }

// function startObstacleAnimation() {
//   obstacle.style.right = "-50px";
//   obstacleInterval = setInterval(() => {
//     let right = parseInt(obstacle.style.right) || 0;
//     obstacle.style.right = right + 2 + "px";

//     if (right >= 800) {
//       obstacle.style.right = "-50px";
//     }
//   }, 0.00000001);
// }

// function stopObstacle() {
//   clearInterval(obstacleInterval);
//   obstacle.style.display = "none";
// }

// function checkCollision() {
//   const playerRect = player.getBoundingClientRect();
//   const obstacleRect = obstacle.getBoundingClientRect();
//   const fruitRect = fruit.getBoundingClientRect();
//   const giftRect = gift.getBoundingClientRect();

//   if (
//     playerRect.right > obstacleRect.left &&
//     playerRect.left < obstacleRect.right &&
//     playerRect.bottom > obstacleRect.top
//   ) {
//     backgroundMusic.pause();
//     endGame("遊戲結束！");
//   }

//   if (
//     fruitActive &&
//     playerRect.right > fruitRect.left &&
//     playerRect.left < fruitRect.right &&
//     playerRect.top < fruitRect.bottom
//   ) {
//     fruitSound.currentTime = 0;
//     fruitSound.play();
//     updateScore(275);
//     fruitActive = false;
//     resetFruit();
//   }

//   if (
//     giftActive &&
//     playerRect.right > giftRect.left &&
//     playerRect.left < giftRect.right &&
//     playerRect.top < giftRect.bottom
//   ) {
//     fruitSound.currentTime = 0;
//     fruitSound.play();
//     updateScore(245);
//     giftActive = false;
//     resetGift();
//   }

//   if (cake) {
//     const cakeRect = cake.getBoundingClientRect();
//     if (
//       playerRect.right > cakeRect.left &&
//       playerRect.left < cakeRect.right &&
//       playerRect.bottom > cakeRect.top
//     ) {
//       showBirthdayCard();
//     }
//   }
// }

// function resetFruit() {
//   if (isGameOver) return;
//   fruit.style.display = "none";
//   setTimeout(() => {
//     if (!isGameOver) {
//       fruit.style.right = "-50px";
//       fruit.style.top = `${Math.random() * 100 + 50}px`;
//       fruit.style.display = "block";
//       fruitActive = true;
//     }
//   }, 1000);
// }

// function resetGift() {
//   if (isGameOver) return;
//   gift.style.display = "none";
//   setTimeout(() => {
//     if (!isGameOver) {
//       gift.style.right = "-50px";
//       gift.style.top = `${Math.random() * 100 + 50}px`;
//       gift.style.display = "block";
//       giftActive = true;
//     }
//   }, 5000);
// }

// function showBirthdayCard() {
//   backgroundMusic.pause();
//   HBDSound.currentTime = 0;
//   HBDSound.play();
//   isGameOver = true;
//   clearInterval(gameInterval);
//   birthdayCard.classList.remove("hidden");
//   cake.style.display = "none";
//   obstacle.style.display = "none";
//   fruit.style.display = "none";
//   gift.style.display = "none";
// }

// function endGame(message) {
//   isGameOver = true;
//   clearInterval(gameInterval);
//   alert(message);
//   location.reload();
// }

// // 強制螢幕為橫向模式
// function checkOrientation() {
//   if (window.innerWidth < window.innerHeight) {
//     alert("請將裝置旋轉至橫向模式以繼續遊戲！");
//   }
// }

// window.addEventListener("orientationchange", checkOrientation);
