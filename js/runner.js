var bulletRefresh = 10;
var enemyRefresh = 50;
var enemyLeft = -5;
var bulletLeft = 5;

newPlayer = new Player('player');
newGame = new Game(player => newPlayer);

document.getElementById('start').onclick = newGame.start;
