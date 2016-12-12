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
var b = 0; // number all the bullets
var en = 0;

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

function createBullet(){
        var bulletId = "bullet" + b;
        bullet[b] = document.createElement('div');
        bullet[b].className = "bullet";
        document.getElementById('gameArea').appendChild(bullet[b]);
        bullet[b].id = bulletId;
        bullet[b].style.top = player.offsetTop + 'px'; //puts the bullet where the player is
        bullet[b].style.left = 0 + 'px';
        b++;
        return bullet[b-1];
    }

function createEnemy(){
        var enemyId = "enemy" + en;
        enemy[en] = document.createElement('div');
        enemy[en].className = "enemy";
        document.getElementById('gameArea').appendChild(enemy[en]);
        enemy[en].id = enemyId;
        enemy[en].style.top = 350 * Math.random() + 'px'; // puts the enemy element at a random vertical position between 0 and 350(because 50 is height of the enemy)
        enemy[en].style.left = 975 + 'px';
        en++;
        return enemy[en-1];
    }

function moveEnemy(){
        var currentEnemy = createEnemy();
        var enemyX = 980;
        fly();
        /*I plan to add another collision detection block of code here so that it's executed every time an enemy is spawned, 
        this way the spawned enemies can be killed with bullets fired after the spawning, 
        so far nothing I tried worked*/
        function fly(){
            enemyX-=enemyLeft;
            currentEnemy.style.left = enemyX + 'px';
            var flyTimer = setTimeout(fly, enemyRefresh); // calls fire every 5 miliseconds
        }
        if(enemyX < -25){
                clearInterval(flyTimer);
                delete enemyX;
                document.currentEnemy.parentNode.removeChild(currentEnemy);
        }
        var enemySpawn = setTimeout(moveEnemy, spawnEnemy);
    }

moveEnemy();
document.onkeydown = move;
document.onclick = createBullet;