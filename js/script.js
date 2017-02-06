var alive = true;
var score = 0;
var pos=200; //initial position wil be regulated in move function
var bulletLeft = 5; // how many pixels left each bullet moves at a time
var bulletRefresh = 10; // how often bullet moves the above number of pixels in ms
var enemyLeft = 5; // how many pixels left each enemy moves at a time, can be used later for increasing difficulty etc
var enemyRefresh = 50; // how often the enemy moves the above number of pixels in ms
var spawnEnemy = 1000; // how often an enemy spawns in ms
var bullet = new Array; // stores bullets
var enemy = new Array; // stores enemies
var i = 1; // each new bullet is given an id of i, i starts at 1 and is incremented by 2
var j = 0; // each new enemy is given id of j, j starts at 0 and is also incremented by 2, this ensures unique id for every enemy and bullet
document.getElementById("player").style.top = 180 + 'px'; //positions the player in the middle of the game area

function start(){
     // when the game starts removes the start screen
    // function move is responsible for moving the player up and down with W and S respectively, activated on keydown
    function move(e){
        var player = document.getElementById("player");
        if(e.keyCode == 83 && player.offsetTop < 360){ //limits the player from going out of game area
            pos += 10; //moves by 10 px
            player.style.top = pos + 'px';
        }else if(e.keyCode == 87 && player.offsetTop > 0){ //limits the player from going out of game area
            pos -= 10;
            player.style.top = pos + 'px';
        }
    }
    //creates a div element with class 'bullet' and id 'i' (for access to collision detection); returns the html element it creates
    function createBullet(){
        bullet[i] = document.createElement('div');
        bullet[i].className = "bullet";
        document.getElementById('gameArea').appendChild(bullet[i]);
        bullet[i].id = i;
        bullet[i].style.top = player.offsetTop + 'px'; //puts the bullet where the player is
        bullet[i].style.left = 0 + 'px';
        return bullet[i];
    }

    //creates a div element with class 'enemy' and id 'j' (for access to collision detection); returns the html element it created
    function createEnemy(){
        enemy[j] = document.createElement('div');
        enemy[j].className = "enemy";
        document.getElementById('gameArea').appendChild(enemy[j]);
        enemy[j].id = j;
        enemy[j].style.top = 350 * Math.random() + 'px'; // puts the enemy element at a random vertical position between 0 and 350(because 50 is height of the enemy)
        enemy[j].style.left = 975 + 'px';
        return enemy[j];
    }

    //function shoots creates and moves each bullet
    function shoot(){
        var a = createBullet(); //creates the bullet[i] assigns it to a;
        i+=2; //increments so that the next bullet has different id, was originally part of shoot function but moved down here for collision detection, haven't made that work yet
        var bulletX = 0; // horizontal position of each new bullet is 0;
        fire(); // executes fire immidietly which moves the bullet 5px every 10ms
        /* Below is part of the collision detection, it executes(or should) every time a shot is fired,
        checks the enemy array for any element with horizontal position +-50px of position of the fired bullet,
        once it finds one, makes its ID equal to r and uses it later to remove the enemy element
        also computes the t variable which is time til collision so it can remove both bullet, the element and activate the explosion animatin at the right moment
        */
        for(n=0; n < enemy.length; n++){
            if(enemy[n] == null){}
            else{
            var r = enemy[n].id;
            var deadEnemy = document.getElementById(r);
                if(deadEnemy !== null){
                if(a.offsetTop > deadEnemy.offsetTop - 50 && a.offsetTop < deadEnemy.offsetTop + 50 && deadEnemy.offsetLeft>0){
                    var t = (deadEnemy.offsetLeft - a.offsetLeft)/(enemyLeft/enemyRefresh + bulletLeft/bulletRefresh);
                    setTimeout(function(){kill(a,r)}, t); //calls function kill after t miliseconds
                    return
                    }
                }
            }
        }
        function fire(){
            console.log(alive);
            bulletX+=bulletLeft; //bullet left is necessary here for easy manipulation of speed
            a.style.left = bulletX + 'px'; // styles bullet element left property every iteration
            var fireTimer = setTimeout(fire, bulletRefresh); //controls how often bullet is moved
            if(bulletX > 980){ // deletes the bullets that leave the game area
                    clearInterval(fireTimer);
                    if(a == null || a.parentElement == null){}  /* checks whether the bullets exist first, in case they were dstroyed in
                        kill function and also because billions of errors is annoying.
                        for some reason neither a!= nor a !== was not working as well so I left it like this
                        */
                    else{
                        a.parentElement.removeChild(a);// learned about remove() function couple of hours before the interview, didn't want to start changing things now
                        delete bulletX, a;
                    }
                return // not quite sure why I put return here, will investigate
            }
        }
    }

    //function kill takes parameters a - bullet object and r the id of the dead enemy so that it knows what to remove
    function kill(a,r){
        Explosion(r); // executes Explosion function that is responsible for explosion animation, uses parameter r which is the id of the soon to be dead enemy
        if(document.getElementById(r) == null){}
        else if(a == null){} // bunch of if statements to prevent execution in case 'a' has already been removed and doesn't exist
        else if(document.getElementById(r).parentElement == null){}
        else{
            a.parentNode.removeChild(a);
            document.getElementById(r).parentElement.removeChild(document.getElementById(r));
            score++;
            document.getElementById("score").innerHTML = "Score: " + score; // updates the score
        }
    }

    //function moveEnemy much like the shoot function, in fact exactly the same, but instead of onclick is executed every spawnEnemy
    function moveEnemy(){
        var b = createEnemy();
        j+=2;
        var enemyX = 980;
        fly();
        /*I plan to add another collision detection block of code here so that it's executed every time an enemy is spawned,
        this way the spawned enemies can be killed with bullets fired after the spawning,
        so far nothing I tried worked*/
        function fly(){
            enemyX-=enemyLeft;
            b.style.left = enemyX + 'px';
            var flyTimer = setTimeout(fly, enemyRefresh); // calls fire every 5 miliseconds
        if(enemyX < -25){
                clearInterval(flyTimer);
                delete enemyX;
                    if(b.parentElement !== null){
                        b.parentElement.removeChild(b);
                    }
                }
        }
        var enemySpawn = setTimeout(moveEnemy, spawnEnemy);
    }

    //function Explosion creates a new div element with class explosion, takes as the parameter the id of the soon to be dead enemy to get the coordinates of explosion.
    function Explosion(deadId){
            if(document.getElementById(deadId) == null){}
            else{
            explosion = document.createElement('div');
            explosion.className = "explosion";
            document.getElementById('gameArea').appendChild(explosion);
            explosion.style.top = document.getElementById(deadId).offsetTop;
            explosion.style.left = document.getElementById(deadId).offsetLeft;
            var g = 1;
            /* explode variable controls the explotion animation which loops from 1 to 6 setting the div's background image to appropritate one
            sometimes leaves the explosion divs before they reach the final stage, also doesn't remove them, investigating*/
            var explode = setInterval(
                function(){
                    if(g<7){
                        var c = "url(images/explosion" + g + ".png)";
                            explosion.style.backgroundImage = c;
                            g++;
                    } else{
                            clearInterval(explode);
                            g = 1;
                            explosion.style.display = 'none';
                    }
                },50);
        }
    }

    moveEnemy(); // move enemy activates and keeps executing once you start
    document.onclick = shoot;   // shoot is executed on click, the reason it's on click because spacebar interfered with the move function and I didn't know how to fix that
    document.onkeydown = move; // move is executed onkeydown
}
document.getElementById('start').onclick = start;
