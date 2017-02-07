var Game = function(args) {
  this.player = args.player,
  this.score = 0,
  this.over = false
}

Game.prototype.spawnEnemy = function(){
  if(!this.over){
    var enemy = createElement("enemy", 1000, 350 * Math.random());
    moveElement(enemy, enemyRefresh, enemyLeft, 1000);
    setTimeout(this.spawnEnemy.bind(this), 1500);
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
