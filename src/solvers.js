/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
   
  var board = new Board({n: n});

  var coordinates = [];

  var recurse = function(round) {
    //terminating condition:
    if (round === n) {
      return board.rows();
    } else {
      
      for (var col = 0; col < n; col++) {
        board.togglePiece(round, col);
        coordinates.push([round, col]);

        if (!board.hasAnyColConflicts()) {
          return recurse(round + 1);
        }
        
        let rewind = coordinates.pop();
        board.togglePiece(rewind[0], rewind[1]);
      }
    }
  };

  var solution = recurse(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var coordinates = [];

  var recurse = function(round) {
    //terminating condition:
    if (round === n) {
      solutionCount++;
      return;
    } else {
      
      for (var col = 0; col < n; col++) {
        board.togglePiece(round, col);
        coordinates.push([round, col]);

        if (!board.hasAnyColConflicts()) {
          recurse(round + 1);
        }
        
        let rewind = coordinates.pop();
        board.togglePiece(rewind[0], rewind[1]);
      }
    }
  };

  recurse(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});

  var coordinates = [];

  var recurse = function(round) {
    //terminating condition:
    if (round === n) {
      return board.rows();
    } else {
      
      for (var col = 0; col < n; col++) {
        board.togglePiece(round, col);
        coordinates.push([round, col]);

        if (!board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
          var result = recurse(round + 1);
          if (result) {
            return result;
          }
        }
        
        let rewind = coordinates.pop();
        board.togglePiece(rewind[0], rewind[1]);
      }
    }
  };

  var solution = recurse(0) || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var coordinates = [];

  var recurse = function(round) {
    //terminating condition:
    if (round === n) {
      solutionCount++;
      return;
    } else {
      
      for (var col = 0; col < n; col++) {
        board.togglePiece(round, col);
        coordinates.push([round, col]);

        if (!board.hasAnyColConflicts() && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
          recurse(round + 1);
        }
        
        let rewind = coordinates.pop();
        board.togglePiece(rewind[0], rewind[1]);
      }
    }
  };

  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
