const N = 50;
const canvas = document.getElementById('mazeCanvas');
const ctx = canvas.getContext('2d');
const maxX = canvas.width;
const maxY = canvas.height;
const w = maxX / N;
const h = maxY / N;

// create the maze
const maze = [];
for (let i = 0; i < N; i++) {
  maze.push([]);
  for (let j = 0; j < N; j++) {
    maze[i].push(0);
  }
}

// draw a cell
const drawCell = (i, j, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(j * w + 1, i * h + 1, w-2, h-2);
};

// draw the board
const drawBoard = () => {
  ctx.fillStyle = 'sepia';
  ctx.fillRect(0, 0, maxX, maxY);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (maze[i][j] === 1) {
        drawCell(i, j, 'darkgrey');
      } else {
        drawCell(i, j, 'darkgreen');
      }
    }
  }
};

// start
drawBoard();

// generate the maze
const generateMaze = (i, j) => {
  maze[i][j] = 1;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  // random direction
  rand = Math.floor(Math.random() * 4);
  [dx, dy] = directions[rand];
  initial_rand = rand;
  blocked = false;

  while (!blocked) {
    const ni = i + dx;
    const nj = j + dy;
    if (ni > 0 && ni < N && nj > 0 && nj < N &&
       maze[ni][nj] === 0 &&
       maze[ni+dx][nj+dy] === 0 &&
       maze[ni+dy][nj] === 0 &&
       maze[ni][nj+dx] === 0) {
      maze[i + dx][j + dy] = 1;
      drawCell(i + dx, j + dy, 'white');
      sleep(100).then(() => {
        generateMaze(ni, nj);
      });
    } else {
      rand = (rand + 1) % 4;
      [dx, dy] = directions[rand];
      if (rand == initial_rand) {
        blocked = true;
      }
    }
  }
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

generateMaze(1, 1);