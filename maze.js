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