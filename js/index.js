const Gameboard = ( ()=> {

  let board = [ [null, null, null],
                [null, null, null],
                [null, null, null] ]

  const printBoard = () => {
    for (var i = 0; i < 3; i++) {
      console.log(board[i][0],board[i][1],board[i][2]);
    }
  }

  const registerMove = (marker, coordinates) => {
    let displaybox = $(`.box[data-pos= ${coordinates} ]`)
    if(board[coordinates[0]][coordinates[1]]== null){
      board[coordinates[0]][coordinates[1]] = marker;
      displaybox.text(marker) ;
    }
  }

  const checkWinStatus = (marker) => {
    for (var i = 0; i < 3; i++) {
      if( board[i][0] == marker && board[i][1] == marker &&  board[i][2] == marker)return true;
    }

    for (var i = 0; i < 3; i++) {
      if( board[0][i] == marker && board[1][i] == marker &&  board[2][i] == marker)return true;
    }

    if( board[0][0] == marker && board[1][1] == marker &&  board[2][2] == marker)return true;
    if( board[0][2] == marker && board[1][1] == marker &&  board[2][0] == marker)return true;

    return false;
  }

  const gameStatus = (marker,moves) => {
      if (checkWinStatus(marker) == true ){
        if (marker == "X") {
          console.log(player1.getName(), "wins");
        }
        else {
          console.log(player2.getName(), "wins");
        }
        resetBoard();
      }

      else if (moves ==  8 ) {
        console.log("tie");
        resetBoard();
      }
  }

  const resetBoard = () => {
      board = [ [null, null, null],
                [null, null, null],
                [null, null, null] ]

      let boxes = document.querySelectorAll(".box");
      boxes.forEach( function(box){
          box.innerHTML = "";
      })

      Game.setMoves(0);
  }

  return {printBoard, registerMove, gameStatus};

})();

Gameboard.printBoard();


const Player = (name,marker) => {

    let Name = name;
    let Marker = marker;

    let move = (coordinates) => {
      Gameboard.registerMove(Marker,coordinates);
    }

    let getName = () => {
      return name;
    }

    return {move,marker,getName};
}

player1 = Player("Bhosidi","X");
player2 = Player("Boy","O");


const Game = ( () => {

    let playerswitch = false;
    let moves = 0;

    let switchPlayerAndPlay = (coordinates) => {
      if ( playerswitch == false) {
        player1.move(coordinates);
        Gameboard.gameStatus(player1.marker,moves);
        playerswitch = true;
      }
      else {
        player2.move(coordinates);
        Gameboard.gameStatus(player2.marker,moves);
        playerswitch = false;
      }
      moves+=1;
    }

    let move = () => {
      let boxes = document.querySelectorAll(".box");
      boxes.forEach( function(box){
        box.onclick = function(e){
          let coordinates = $(e.target).attr('data-pos');
          switchPlayerAndPlay(coordinates);
        }
      })
    }

    const setMoves = (num) => {
      moves = 0;
    }

    return {move,setMoves};

})();


Game.move();
