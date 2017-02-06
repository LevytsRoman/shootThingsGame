var Game = function(args) {
  this.player = args.player,
  this.score = 0,
  this.over = false
}

Game.prototype.spawnEnemy = function(){
  if(!this.over){
    var enemy = createElement("enemy", 500, 350 * Math.random());
    moveElement(enemy, 50, -10, 1000);
    setTimeout(this.spawnEnemy.bind(this), 3000);
  }
}

Game.prototype.start = function(){
  document.getElementById("start").style.display = 'none';
  newPlayer.move();
  newPlayer.shoot();
  newGame.spawnEnemy();
}

var Player = function(playerId){
  this.pos = 170,
  this.plane = document.getElementById(playerId),
  this.lives = 3,
  this.plane.style.top = this.pos
};

Player.prototype.move = function(){
  window.onkeydown = function(e){
    if(e.keyCode == 83 && this.plane.offsetTop < 360){ //limits the player from going out of game area
      this.pos += 10; //moves by 10 px
      this.plane.style.top = this.pos + 'px';
    } else if(e.keyCode == 87 && this.plane.offsetTop > 0){ //limits the player from going out of game area
      this.pos -= 10;
      this.plane.style.top = this.pos + 'px';
    }
  }.bind(this)
}

Player.prototype.shoot = function(){
  window.onclick = function(e){
    var bullet = createElement("bullet", 0, newPlayer.pos);
    moveElement(bullet, 50, 10, 500);
  }.bind(this)
}

function createElement(elementClass, startingX, startingY){
  newElement = document.createElement('div');
  newElement.className = elementClass;
  document.getElementById('gameArea').appendChild(newElement);
  newElement.style.top = startingY + 'px';
  newElement.style.left = startingX + 'px';
  return newElement;
}

function moveElement(element, interval, pixels, limit){
  var elementX = element.offsetLeft;
  elementX += pixels;
  element.style.left = elementX + 'px';
  var moveTimer = setTimeout(moveElement.bind(null, element, interval, pixels, limit), interval);
  if(elementX < 0 || elementX > limit){
    clearInterval(moveTimer);
  }
}

newPlayer = new Player('player');
newGame = new Game(player => newPlayer);

document.getElementById('start').onclick = newGame.start;
