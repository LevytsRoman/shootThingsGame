var Game = function(args) {
  this.player = args.player,
  this.score = 0,
  this.over = false,
  this.lives = 3
}

Game.prototype.spawnEnemy = function(){
  if(!this.over){
    if(enemyRefresh >= 5){enemyRefresh -= 1;}
    if(enemySpawnInterval >= 500){enemySpawnInterval -= 20;}

    var enemy = createElement("enemy", 1000, 350 * Math.random());
    moveElement(enemy, enemyRefresh, enemyLeft, 1000);
    setTimeout(this.spawnEnemy.bind(this), enemySpawnInterval);
  }
}

Game.prototype.start = function(){
  document.getElementById('start').onclick = function(){
    document.getElementById("start").style.display = 'none';
    newPlayer.move();
    newPlayer.shoot();
    newGame.spawnEnemy();
    setInterval(collisionDetect.bind(this), 10);
  }.bind(this);
}

Game.prototype.updateScore = function(){
  // debugger
  this.score ++;
  document.getElementById("score").innerHTML = "Score: " + this.score;
}

Game.prototype.updateLives = function(){
  this.lives -= 1;
  document.getElementById("lives").innerHTML = "Lives: " + this.lives;
  if(this.lives === 0){
    this.over = true;
    this.gameOver();
  }
}

Game.prototype.gameOver = function(){
  // debugger
  var enemies = document.getElementsByClassName("enemy"),
      l = enemies.length;
  for(var i=l-1; i >= 0; i--){
    console.log(enemies);
    blowUp(enemies[i].offsetLeft, enemies[i].offsetTop);
    deleteElement(enemies[i]);
  }
  blowUp(0, this.player.pos);
  deleteElement(document.getElementById('player'));
  setTimeout(function(){
    document.getElementById("game-over").style.display = 'block';
  }, 1000);
}
