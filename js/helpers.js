function createElement(elementClass, startingX, startingY){
  newElement = document.createElement('div');
  newElement.className = elementClass;
  document.getElementById('gameArea').appendChild(newElement);
  newElement.style.top = startingY + 'px';
  newElement.style.left = startingX + 'px';
  return newElement;
}

function moveElement(element, interval, pixels, limit){
  if(!newGame.over){
    var elementX = element.offsetLeft;
    elementX += pixels;
    element.style.left = elementX + 'px';
    var moveTimer = setTimeout(moveElement.bind(null, element, interval, pixels, limit), interval);
    if(elementX < -5){
      debugger
      clearInterval(moveTimer);
      deleteElement(element);
      newGame.updateLives();
    }
    if(elementX > limit){
      clearInterval(moveTimer);
      deleteElement(element);
    }
  }
}

function deleteElement(element){
  if(element.parentNode !== null){
    element.parentNode.removeChild(element);
  }
}

function collisionDetect(){
  if(!this.over){
    var enemies = document.querySelectorAll('.enemy, .shootable');
    var bullets = document.getElementsByClassName("bullet");

    for(var i=0; i < enemies.length; i++){
      for(var j=0; j < bullets.length; j++){
        if(bullets[j].offsetTop > enemies[i].offsetTop - 50 && bullets[j].offsetTop < enemies[i].offsetTop + 50 && bullets[j].offsetLeft > enemies[i].offsetLeft - 40){
          this.updateScore();
          blowUp(enemies[i].offsetLeft, enemies[i].offsetTop);
          deleteElement(bullets[j]);
          deleteElement(enemies[i]);
        }
      }
    }
  }
}

function blowUp(x,y){
  var explosion = document.createElement('div');
  explosion.className = "explosion";
  document.getElementById('gameArea').appendChild(explosion);
  explosion.style.top = y + 'px';
  explosion.style.left = x + 'px';
  var g = 1;
  var explode = setInterval(function(){
    if(g<7){
      var c = "url(images/explosion" + g + ".png)";
      explosion.style.backgroundImage = c;
      g++;
    } else{
      clearInterval(explode);
      deleteElement(explosion);
    }
  }, 100);
}
