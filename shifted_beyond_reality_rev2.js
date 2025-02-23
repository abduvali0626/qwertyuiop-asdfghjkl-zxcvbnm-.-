// Game Initialization
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 30,
  speed: 5,
};

let shiftStatus = "None";
let shiftTimer = 0;
let distortionTimer = 0;

// Game Update Loop
function update() {
  // Adjust canvas size on window resize
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the environment: sky, clouds, ground
  drawEnvironment();

  // Handle player movement
  if (keys.up && player.y > 0) player.y -= player.speed;
  if (keys.down && player.y < canvas.height - player.size)
    player.y += player.speed;
  if (keys.left && player.x > 0) player.x -= player.speed;
  if (keys.right && player.x < canvas.width - player.size)
    player.x += player.speed;

  // Simulate shifting reality periodically
  if (Math.random() < 0.01) {
    triggerRealityShift();
  }

  // Draw player
  ctx.fillStyle = "#ff5733";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();

  // Update HUD info
  document.getElementById("playerInfo").textContent = `Position: (${Math.round(
    player.x
  )}, ${Math.round(player.y)})`;
  document.getElementById(
    "shiftInfo"
  ).textContent = `Reality Shift: ${shiftStatus}`;

  // Request next frame
  requestAnimationFrame(update);
}

// Draw the environment: sky, clouds, ground
function drawEnvironment() {
  // Draw sky with flickering effect
  ctx.fillStyle = shiftTimer > 0 ? "#ff3399" : "#2f6fd1"; // Sky color change during shift
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw random distortions in the sky
  if (distortionTimer > 0) {
    distortEnvironment();
    distortionTimer--;
  }

  // Randomly flickering clouds
  ctx.fillStyle = "#fff"; // White clouds
  drawFlickeringClouds();

  // Ground with unsettling color change
  ctx.fillStyle = shiftTimer > 0 ? "#660066" : "#00b300"; // Ground color shifts with the reality shift
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Add surreal floating objects
  drawFloatingObjects();
}

// Flickering clouds
function drawFlickeringClouds() {
  let cloudCount = 10 + Math.random() * 10;
  for (let i = 0; i < cloudCount; i++) {
    if (Math.random() > 0.7) continue; // 30% chance of no cloud appearing in random spots
    let cloudX = Math.random() * canvas.width;
    let cloudY = Math.random() * (canvas.height / 2);
    let cloudSize = Math.random() * 50 + 50;

    ctx.beginPath();
    ctx.arc(cloudX, cloudY, cloudSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Draw random, surreal floating objects
function drawFloatingObjects() {
  let objectCount = 5 + Math.random() * 3;
  for (let i = 0; i < objectCount; i++) {
    if (Math.random() > 0.9) continue; // 10% chance for objects to appear

    let objectX = Math.random() * canvas.width;
    let objectY = (Math.random() * canvas.height) / 2;
    let objectSize = Math.random() * 100 + 30;
    ctx.fillStyle = "#b2ff66"; // Bright, surreal colors
    ctx.beginPath();
    ctx.arc(objectX, objectY, objectSize, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Introduce distortions and random changes in the environment
function distortEnvironment() {
  // Randomly distort parts of the environment
  let distortionChance = Math.random();
  if (distortionChance < 0.05) {
    // Create random distortions in the sky or clouds
    ctx.fillStyle = "#d9d9d9"; // Light gray distortion
    ctx.beginPath();
    ctx.arc(
      Math.random() * canvas.width,
      (Math.random() * canvas.height) / 2,
      Math.random() * 150 + 50,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  if (distortionChance < 0.1) {
    // Ground might split or randomly distort
    ctx.fillStyle = "#ff6600"; // Orange distortion
    ctx.fillRect(
      Math.random() * canvas.width,
      Math.random() * (canvas.height - 100),
      Math.random() * 150,
      10
    );
  }
}

// Reality Shift Effect
function triggerRealityShift() {
  if (shiftTimer <= 0) {
    shiftStatus = "Shifting...";

    setTimeout(() => {
      shiftTimer = 100; // Set the shift duration
      distortionTimer = 200; // Activate the distortion effect for a period
      // After shift, reset status after the shift timer ends
      setTimeout(() => {
        shiftStatus = "None";
        shiftTimer = 0;
        distortionTimer = 0;
      }, 2000); // Shift duration of 2 seconds
    }, 100);
  }
}

// Key event listeners for movement
let keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") keys.up = true;
  if (e.key === "ArrowDown") keys.down = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
});

window.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") keys.up = false;
  if (e.key === "ArrowDown") keys.down = false;
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
});

// Start the game loop
update();
