var bulletRefresh = 10,
    enemyRefresh = 50,
    enemyLeft = -5,
    bulletLeft = 5,
    enemySpawnInterval = 1500;

newPlayer = new Player('player');
newGame = new Game({player: newPlayer});

newGame.start();
