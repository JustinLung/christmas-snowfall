import './style.css';

const canvas: HTMLCanvasElement = document.getElementById("snow-canvas") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

// Set canvas size to cover the whole window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let treeTopX = canvas.width / 2;
let treeTopY = canvas.height - 700; // Position at the bottom of the canvas
let triangleWidths = [500, 615, 700]; // Widths for the triangles
let triangleHeight = 180;
let triangleSpacing = -30;

// Variables for trunk
let trunkX = canvas.width / 2 - 75;
let trunkY = canvas.height - 225; // Position at the bottom of the canvas
let trunkWidth = 150;
let trunkHeight = 150;

// Create an array to hold the snowflakes
interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

const snowflakes: Snowflake[] = [];

// Function to create a new snowflake
function createSnowflake(): Snowflake {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 3 + 1,
    opacity: Math.random() * 0.5 + 0.5,
  };
}

// Function to draw a snowflake
function drawSnowflake(snowflake: Snowflake): void {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
  ctx.fill();
  ctx.closePath();
}

function drawChristmasTreeAndTrunk(treeTopX: number, treeTopY: number, trunkX: number, trunkY: number): void {
  // Draw the trunk
  ctx.fillStyle = 'rgb(150, 75, 0)';
  ctx.fillRect(trunkX, trunkY, trunkWidth, trunkHeight);

  // Draw the tree
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(treeTopX, treeTopY + i * (triangleHeight + triangleSpacing));
    ctx.lineTo(treeTopX - triangleWidths[i] / 2, treeTopY + triangleHeight + i * (triangleHeight + triangleSpacing));
    ctx.lineTo(treeTopX + triangleWidths[i] / 2, treeTopY + triangleHeight + i * (triangleHeight + triangleSpacing));
    ctx.closePath();
    ctx.fillStyle = 'rgba(0, 128, 0, 1)';
    ctx.fill();
  }
}
// Function to update the snowflakes' positions
function updateSnowflakes(): void {
  for (let i = 0; i < snowflakes.length; i++) {
    const snowflake = snowflakes[i];
    snowflake.y += snowflake.speed;

    // If the snowflake reaches the bottom, reset its position
    if (snowflake.y > canvas.height) {
      snowflake.y = 0;
    }
  }
}

// Function to render the scene
function render(): void {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Christmas tree and trunk
  drawChristmasTreeAndTrunk(treeTopX, treeTopY, trunkX, trunkY);

  // Update and draw each snowflake
  updateSnowflakes();
  snowflakes.forEach(drawSnowflake);

  // Request the next animation frame
  requestAnimationFrame(render);
}

// Create initial snowflakes
const amount: number = 300;
for (let i = 0; i < amount; i++) {
  snowflakes.push(createSnowflake());
}

// Start the animation loop
render();
