function getNeighbors(row, col, matrix) {
  let neighbors = [];
  const nonZero = function(row, col, matrix){
    if (matrix[row][col] === 1) {
      neighbors.push([row, col]);
    }
  }
  // Check top
  if (row > 0) {
    nonZero(row - 1, col, matrix);
  }
  // Check top right
  if (row > 0 && col < matrix[0].length - 1) {
    nonZero(row - 1, col + 1, matrix);
  }
  // Check right
  if (col < matrix[0].length) {
    nonZero(row, col + 1, matrix);
  }
  // Check bottom right
  if (row < matrix.length - 1 && col < matrix[0].length - 1) {
    nonZero(row + 1, col + 1, matrix);
  }
  // Check bottom
  if (row < matrix.length - 1) {
    nonZero(row + 1, col, matrix);
  }
  // Check bottom left
  if (row < matrix.length - 1 && col > 0) {
    nonZero(row + 1, col - 1, matrix);
  }
  // Check left
  if (col > 0) {
    nonZero(row, col - 1, matrix);
  }
  // Check top left
  if (row > 0 && col > 0) {
    nonZero(row - 1, col - 1, matrix);
  }
  // Return neighbors
  return neighbors;
}

function countIslands(matrix) {

  // Create a visited set to store visited nodes
  let visited = new Set();
  // Initialize count to 0
  let islandCount = 0;
  // Iterate through all indices in matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
    // If an index contains a 1 and has not been visited,
      if (matrix[i][j] === 1 && !visited.has([i, j].join(','))) {
      // increment island count and start traversing neighbors
        // DO THE THING (increment island count by 1)
        islandCount++;
        // Initialize a stack with current index
        let stack = [[i, j]];
        // Add stringified version of current index to the visited set
        visited.add([i, j].join(','));
        // While stack contains elements
        while (stack.length !== 0) {
          // Pop element from stack
          let currentNode = stack.pop();
          // Get valid neighbors of current element
          let neighbors = getNeighbors(currentNode[0], currentNode[1], matrix);
          // Iterate over neigbors
          // If neighbor has not been visited
          neighbors.forEach(neighbor => {
            if (!visited.has(neighbor.join(','))) {
              // Add neighbor to stack
              stack.push(neighbor);
              // Mark neighbor as visited
              visited.add(neighbor.join(','));
            }
          });
        }
      }
    }
  }
  // Return island count
  return islandCount;
}

// Uncomment the lines below for local testing
// const matrix = [
//                 [1,1,1,0,0],
//                 [0,1,1,0,1],
//                 [0,1,1,0,1]
//               ]

// console.log(getNeighbors(1, 1, matrix)); // [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1], [2, 2]]
// console.log(getNeighbors(2,4, matrix)) // [[1,4]]

// const matrix2 = [
//                     [1,1,1,0,1],
//                     [0,0,0,0,1],
//                     [1,0,0,1,0],
//                 ]

// console.log(countIslands(matrix)) // 2
// console.log(countIslands(matrix2)); // 3

module.exports = [countIslands, getNeighbors];
