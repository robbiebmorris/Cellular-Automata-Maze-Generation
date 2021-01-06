var mazeSize = 800;
var rowSize = 40;
var fps = 5;

var randomGrid = () => {
  var grid = new Array(rowSize);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(rowSize);
    for (var j = 0; j < grid.length; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
  return grid;
}

var cellSize = mazeSize / rowSize;
var drawGrid = (ctx, grid) => {
  ctx.strokeStyle = "#aaa";
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid.length; j++) {
      var value = grid[i][j];
      if (value) {
        ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
      }
      ctx.strokeRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }
}

var getNextGen = (grid) => {
  var nextGrid = new Array (grid.length);
  for (var i = 0; i < grid.length; i++) {
    nextGrid[i] = new Array (grid.length);
    for (var j = 0; j < grid.length; j++) {
      var value = grid[i][j];
      var neighbors = countNeighbors(grid, i, j);
      if (value === 0 && neighbors === 3) {
        nextGrid[i][j] = 1;
      } else if ((value === 1) && (neighbors < 1 || neighbors > 4)) {
        nextGrid[i][j] = 0; 
      } else {
        nextGrid[i][j] = value;
      }
    }
  }
  return nextGrid
}

var countNeighbors = (grid, x, y) => {
  var sum = 0;
  var numOfRows = grid.length
  var numOfCols = grid[0].length
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      const row = (x + i + numOfRows) % numOfRows;
      //had stupid error here with y mistyped as x- maybe put in video
      const col = (y + j + numOfCols) % numOfCols;
      sum += grid[row][col];
    }
  }
  sum -= grid[x][y];
  return sum; 
}

var generation = (ctx, grid) => {
  ctx.clearRect(0, 0, mazeSize, mazeSize);
  drawGrid(ctx, grid);
  var nextGenGrid = getNextGen(grid);
  setTimeout(() => {
    requestAnimationFrame(() => generation(ctx, nextGenGrid)) 
  }, 1000 / fps);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var grid = randomGrid();
generation(ctx, grid);
