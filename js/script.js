var fields = document.getElementsByClassName('field');


function getTable(){
  return Array.prototype.map.call(fields, function(el,i){
    return  el.textContent;
  });
}

var aiPlayer = 'X';
var huPlayer = 'O';

// THIS WILL GET HOW MANY EMPTY FIELDS WE HAVE
function getEmptyFields(table){
  var empty = [];
  for (var i = 0; i < table.length; i++){
    if ((table[i] !== huPlayer) && (table[i] !== aiPlayer)){
      empty.push(i);
    }
  }
  return empty;
}


function isWin(arr, player){
  if (
      ((arr[0] == player) && (arr[1] == player) && (arr[2] == player)) ||
      ((arr[3] == player) && (arr[4] == player) && (arr[5] == player)) ||
      ((arr[6] == player) && (arr[7] == player) && (arr[8] == player)) ||
      ((arr[0] == player) && (arr[3] == player) && (arr[6] == player)) ||
      ((arr[1] == player) && (arr[4] == player) && (arr[7] == player)) ||
      ((arr[2] == player) && (arr[5] == player) && (arr[8] == player)) ||
      ((arr[0] == player) && (arr[4] == player) && (arr[8] == player)) ||
      ((arr[2] == player) && (arr[4] == player) && (arr[6] == player))
  ) {
    return true;
  } else {
    return false;
  }
}

function minimax(newTable, player){
  var emptyFields = getEmptyFields(newTable);

  if (isWin(newTable, huPlayer)){
    return {score: -10};
  } else if (isWin(newTable, aiPlayer)){
    return {score: 10};
  } else if (emptyFields.length === 0){
    return {score: 0};
  }

  var moves = [];

  for (var i = 0; i < emptyFields.length; i++){
    var move = {};

    move.index = emptyFields[i];

    newTable[emptyFields[i]] = player;

    if (player === aiPlayer){
      var result = minimax(newTable, huPlayer);
      move.score = result.score;
    } else {
      var result = minimax(newTable, aiPlayer);
      move.score = result.score;
    }

    newTable[emptyFields[i]] = '';
    moves.push(move);
  }

  var bestMove;

  if (player === aiPlayer){
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++){
      if (moves[i].score > bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++){
      if (moves[i].score < bestScore){
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];

}
function aiWin(){
  alert('AI win!');
}

function tie(){
  alert('Tie');
}


function putDownMark(e){
  if (e.target.textContent === ''){
    e.target.textContent = huPlayer;
    e.target.className += ' huPlayer';
    var table = getTable();
    console.log('table: '+table);
    console.log('empty fields: '+getEmptyFields(table));
    var aiMove = minimax(table, aiPlayer);
    console.log('ai move: '+aiMove);
    console.log(aiMove);
    document.getElementById("f"+aiMove.index).textContent = aiPlayer;
    document.getElementById("f"+aiMove.index).className += " aiPlayer";
    if (aiMove.score === 10){
      aiWin();
    }

  }
}
