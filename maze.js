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
  dist = Math.floor(Math.random() * 8) + 1;
  [dx, dy] = directions[rand];
  initial_rand = rand;
  blocked = false;

  ni = i + dx;
  nj = j + dy;
  while (!blocked) {
    if (ni > 1 && ni < N-1 && nj > 1 && nj < N-1 &&
       ((dx != 0 &&
        maze[ni][nj] === 0 &&
        maze[ni][nj-1] === 0 &&
        maze[ni][nj+1] === 0 &&
        maze[ni+dx][nj+dy] === 0 &&
        maze[ni+dx][nj+dy-1] === 0 &&
        maze[ni+dx][nj+dy+1] === 0) ||
       (dy != 0 && 
        maze[ni][nj] === 0 &&
        maze[ni-1][nj] === 0 &&
        maze[ni+1][nj] === 0 &&
        maze[ni+dx][nj+dy] === 0 &&
        maze[ni+dx-1][nj+dy] === 0 &&
        maze[ni+dx+1][nj+dy] === 0) )) {
      maze[ni][nj] = 1;
      drawCell(ni, nj, 'white');
      sleep(100);
      dist --;
      if (dist <= 0) {
        generateMaze(ni, nj);
      } else {
        ni = ni + dx;
        nj = nj + dy;
      }
    } else {
      drawCell(ni, nj, 'red');
      rand = (rand + 1) % 4;
      [dx, dy] = directions[rand];
      ni = i + dx;
      nj = j + dy;
      if (rand == initial_rand) {
        blocked = true;
      }
    }
  }
};

function sleep(ms) {
}

generateMaze(
  1 + Math.floor(Math.random()*(N-2)),
  1 + Math.floor(Math.random()*(N-2)));