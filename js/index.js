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

  return {printBoard, registerMove};

})();

Gameboard.printBoard();


const Player = (name,marker) => {

    let Name = name;
    let Marker = marker;

    let move = (coordinates) => {
      Gameboard.registerMove(Marker,coordinates);
    }

    return {move};
}

player1 = Player("Bhosidi","X");
player2 = Player("Boy","O");


const Game = ( () => {

    let playerswitch = false;
    let player;

    let switchPlayer = (coordinates) => {
      if ( playerswitch == false) {
        player1.move(coordinates);
        playerswitch = true;
      }
      else {
        player2.move(coordinates);
        playerswitch = false;
      }
    }

    let move = () => {
      let boxes = document.querySelectorAll(".box");
      boxes.forEach( function(box){
        box.onclick = function(e){
          let coordinates = $(e.target).attr('data-pos');
          switchPlayer(coordinates);
        }
      })
    }

    return {move};

})();


Game.move()
