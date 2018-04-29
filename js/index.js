const Gameboard = ( ()=> {

  let board = [ [null, null, null],
                [null, null, null],
                [null, null, null] ]

  const printBoard = () => {
    for (var i = 0; i < 3; i++) {
      console.log(board[i][0],board[i][1],board[i][2]);
    }
  }

  return {printBoard}

})();
