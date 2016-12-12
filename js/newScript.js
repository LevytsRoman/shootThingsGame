// function moves stuff:
// displacement - pixels per unit of time
// refreshrate - unit of time
// direction - up down left right all
// limit - when function stops

function move(elemId, displacement, refreshrate, limit){
    var elem = document.getElementById(elemId),
        xPos = elem.offsetLeft,
        timeOut = setInterval(function (){
            xPos += displacement;
            elem.style.left = xPos + 'px';
            if (xPos > limit){
                clearInterval(timeOut)
            }
        }, refreshrate);
}

// moves the player
function movePlayer(e){
    var player = document.getElementById("player");
    if(e.keyCode == 83 && player.offsetTop < 360){ //limits the player from going out of game area
        pos += 10; //moves by 10 px
        player.style.top = pos + 'px';
    } else if(e.keyCode == 87 && player.offsetTop > 0){ //limits the player from going out of game area
        pos -= 10;
        player.style.top = pos + 'px';
    }
}

// create a new element
function spawn(type, xPos, yPos){
    
}
