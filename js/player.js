var Player = function(playerId){
  this.pos = 170,
  this.plane = document.getElementById(playerId),
  this.lives = 3,
  this.plane.style.top = this.pos
};

Player.prototype.move = function(){
  window.onkeydown = function(e){
    if(e.keyCode == 83 || e.keyCode == 40 && this.plane.offsetTop < 360){ //limits the player from going out of game area
      this.pos += 10; //moves by 10 px
      this.plane.style.top = this.pos + 'px';
    } else if(e.keyCode == 87 || e.keyCode == 38 && this.plane.offsetTop > 0){ //limits the player from going out of game area
      this.pos -= 10;
      this.plane.style.top = this.pos + 'px';
    }
  }.bind(this)
}

Player.prototype.shoot = function(){
  window.onclick = function(e){
    var bullet = createElement("bullet", 0, newPlayer.pos);
    moveElement(bullet, bulletRefresh, bulletLeft, screenWidth - 25);
    collisionDetect(bullet);
  }.bind(this)

  window.onkeypress = function(e){
    if( e.keyCode === 32){
      var bullet = createElement("bullet", 0, newPlayer.pos);
      moveElement(bullet, bulletRefresh, bulletLeft, screenWidth - 25);
      collisionDetect(bullet);
    }
  }.bind(this)
}
