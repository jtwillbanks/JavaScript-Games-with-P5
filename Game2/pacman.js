/* Author: Jacob Willbanks */
/*--------------------------------------------------------|
| Javascript function for Pacman game for CMPS 2680       |
| Utilizing p5.js framework by Lauren McCarthy            |
| https://p5js.org/										  |			 
| Spring 2018 - April -> May   Final Project (Game2)      |
|--------------------------------------------------------*/

var pacman, g1, g2, g3, g4;
var pacmanLives = 3;
var pacmanXPos = 260; // 260
var pacmanYPos = 280; // 280
var pacmanXSpeed = 0;
var pacmanYSpeed = 0;
var score = 0;
var death = false;
//var gamePaused = false;
var playerImage, playerImage2, playerImage3, playerImage4, lastPlayerImage;
var collisionXRight = false;
var collisionXLeft = false;
var collisionYUp = false;
var collisionYDown = false;
var movingRight = false;
var movingLeft = false;
var movingUp = false;
var movingDown = false;
var startedMoving = false;
var none;
var wentThroughLeft = false;
var wentThroughRight = false;
var mazePos = [];
var validPos = [];
var red, pink, cyan, blue, lives;
//var mazePos = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var tmpX, tmpY;
//var highs = localStorage.getItem('highs') || 0;
// 1 = Square, 2 = Open, 3 = Dot, 4 = megaDot, 5 = tunnel; (Dots 10 x 10, Mega 20 x 20);
var maze = [
		   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
		   [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,],
		   [1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1,],
		   [1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1,],
		   [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,],
		   [1, 3, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 3, 1,],
		   [1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 1,],
		   [1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1,],
		   [5, 5, 5, 5, 5, 1, 3, 1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1, 3, 1, 5, 5, 5, 5, 5,],
		   [5, 5, 5, 5, 5, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 5, 5, 5, 5, 5,],
		   [1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 5, 5, 5, 5, 5, 5, 5, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1,],
		   [5, 5, 5, 5, 5, 5, 3, 3, 3, 1, 5, 5, 5, 5, 5, 5, 5, 1, 3, 3, 3, 5, 5, 5, 5, 5, 5,],
		   [1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 5, 5, 5, 5, 5, 5, 5, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1,],
		   [5, 5, 5, 5, 5, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 5, 5, 5, 5, 5,],
		   [5, 5, 5, 5, 5, 1, 3, 1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1, 3, 1, 5, 5, 5, 5, 5,],
		   [1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1,],
		   [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,],
		   [1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1,],
		   [1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 1,],
		   [1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 3, 1, 1, 1, 1,],
		   [1, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 1,],
		   [1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1,],
		   [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,],
		   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]
		   ];

/*[
		    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
		    [1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1],
		    [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
		    [1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 3, 1, 1, 1, 1, 1],
		    [1, 3, 3, 3, 3, 3, 3, ]
		    ];*/

function preload() {
	playerImage = loadImage('./assets/pacmanPlayer2.png');
	playerImage2 = loadImage('./assets/pacmanPlayer2Left.png');
	playerImage3 = loadImage('./assets/pacmanPlayer2Up.png');
	playerImage4 = loadImage('./assets/pacmanPlayer2Down.png');
	red = loadImage('./assets/redGhost.png');
	pink = loadImage('./assets/pinkGhost.png');
	cyan = loadImage('./assets/cyanGhost.png');
	blue = loadImage('./assets/blueGhost.png');
	lives = loadImage('./assets/pacLives2.png');
}

function setup() {
	frameRate(10);
	var can = createCanvas(540, 540);
	can.parent('game');
	//g1 = createSprite(270, 170); // 270, 170
	//g1.addImage(loadImage("./assets/redGhost.png"));
	
	g1 = new ghost(260, 160, 1);	// starting ghost
	g2 = new ghost(20, 20, 2);
	g3 = new ghost(500, 20, 3);
	g4 = new ghost(20, 440, 4);
	//g2 = new ghost(220, 220, 2);
	//g3 = new ghost(260, 220, 3);
	//g4 = new ghost(300, 220, 4);
	var rowCount = 0;
	var arrCount = 0;
	var validCount = 0;
	var borderY = 0;
	var borderX = 0;
	//walls = new Group();
	for(var i = 0; i < maze.length; i++) {
		for(var j = 0; j < maze[i].length; j++) {
			if (rowCount == 27) {
				borderY += 20;
				borderX = 0;
				rowCount = 0;
			}
			if(maze[i][j] == 1) {
				mazePos[arrCount] = createVector(borderX, borderY);
				//var wall = createSprite(borderX+10, borderY+10, 20, 20);
				//wall.addImage(loadImage("./assets/squareInv.png"));
			//	walls.add(wall);
				//walls[arrCount] = createSprite(borderX+10, borderY+10, 20, 20);
				//console.log(borderX);
				//console.log(borderY);
				arrCount++;
			}
			if(maze[i][j] == 3 || maze[i][j] == 2) {
				validPos[validCount] = createVector(borderX, borderY);
				//console.log(validPos);
				validCount++;
			}
			/*if(maze[i][j] == 5) {
				var wall = createSprite(borderX+10, borderY+10, 20, 20);
				wall.addImage(loadImage("./assets/squareInv.png"));
				walls.add(wall);
			}*/
			borderX += 20;
			rowCount++;
		}
	} 
}

function draw() {
	if (death)
		return;
	if(score == 2530)
		won();
	background(25);
	collisionCheck();
	//drawSprites();
	kbhit();
	updateScreen();
	g1.displayGhost();
	g2.displayGhost();
	g3.displayGhost();
	g4.displayGhost();
	//g1.randMove();
	g1.generateMove();
	g2.generateMove();
	g3.generateMove();
	g4.generateMove();
	//setInterval(ghostMovement, 3000);
	//g1.collide(walls);
	g1.kill();
	g2.kill();
	g3.kill();
	g4.kill();
	document.getElementById('Score').innerHTML = "Score: "+ score +"";
	if(pacmanLives == 3) {
		image(lives, 10, 490);
		image(lives, 90, 490);
		image(lives, 170, 490);
	}
	if(pacmanLives == 2) {
		image(lives, 10, 490);
		image(lives, 90, 490);
	}
	if(pacmanLives == 1) {
		image(lives, 10, 490);
	}
	//document.getElementById('hScores').innerHTML = "High Score: "+ highs +"";
}

function collisionCheck() {
	// wall collision START
	none = true;
	for(var i = 0; i < mazePos.length; i++) {
		if(pacmanXPos+20 == mazePos[i].x && movingRight && pacmanYPos == mazePos[i].y) {
			console.log('hit');
			collisionXRight = true;
			none = false;
			pacmanXSpeed = 0;
			pacmanYSpeed = 0;
		}
		if(pacmanXPos-20 == mazePos[i].x && movingLeft && pacmanYPos == mazePos[i].y) {
			console.log('hit');
			collisionXLeft = true;
			none = false;
			pacmanXSpeed = 0;
			pacmanYSpeed = 0;
		}
		if(pacmanYPos-20 == mazePos[i].y && movingUp && pacmanXPos == mazePos[i].x) {
			console.log('hit');
			collisionYUp = true;
			none = false;
			pacmanXSpeed = 0;
			pacmanYSpeed = 0;
		}
		if(pacmanYPos+20 == mazePos[i].y && movingDown && pacmanXPos == mazePos[i].x) {
			console.log('hit');
			collisionYDown = true;
			none = false;			
			pacmanXSpeed = 0;
			pacmanYSpeed = 0;
		}
		if(pacmanXPos-20 == mazePos[i].x && movingUp && pacmanYPos == mazePos[i].y) {
			collisionXLeft = true;
			none = false;
		}
		if(pacmanXPos+20 == mazePos[i].x && movingUp && pacmanYPos == mazePos[i].y) {
			collisionXRight = true;
			none = false;
		}
		if(pacmanXPos-20 == mazePos[i].x && movingDown && pacmanYPos == mazePos[i].y) {
			collisionXLeft = true;
			none = false;
		}
		if(pacmanXPos+20 == mazePos[i].x && movingDown && pacmanYPos == mazePos[i].y) {
			collisionXRight = true;
			none = false;
		}
		if(pacmanYPos+20 == mazePos[i].y && movingRight && pacmanXPos == mazePos[i].x) {
			collisionYDown = true;
			none = false;
		}
		if(pacmanYPos-20 == mazePos[i].y && movingRight && pacmanXPos == mazePos[i].x) {
			collisionYUp = true;
			none = false;
		}
		if(pacmanYPos+20 == mazePos[i].y && movingLeft && pacmanXPos == mazePos[i].x) {
			collisionYDown = true;
			none = false;
		}
		if(pacmanYPos-20 == mazePos[i].y && movingLeft && pacmanXPos == mazePos[i].x) {
			collisionYUp = true;
			none = false;
		} //
		if(pacmanYPos-20 == mazePos[i].y && movingDown && pacmanXPos == mazePos[i].x) {
			collisionYUp = true;
			none = false;
		}
		if(pacmanYPos+20 == mazePos[i].y && movingUp && pacmanXPos == mazePos[i].x) {
			collisionYDown = true;
			none = false;
		}
		if(pacmanXPos+20 == mazePos[i].x && movingLeft && pacmanYPos == mazePos[i].y) {
			collisionXRight = true;
			none = false;
		}
		if(pacmanXPos-20 == mazePos[i].x && movingRight && pacmanYPos == mazePos[i].y) {
			collisionXLeft = true;
			none = false;
		}
		if(none) {
			collisionXRight = false;
			collisionXLeft = false;
			collisionYDown = false;
			collisionYUp = false;
		}
	}
	// WALL COLLISION END
	// PORTAL COLLISION START
	if(pacmanXPos == 0 && pacmanYPos == 220) {
		wentThroughLeft = true;
		if(wentThroughRight == false) {
			pacmanXPos = 520;
			pacmanYPos = 220;
		}
	}
	if(pacmanXPos == 520 && pacmanYPos == 220) {
		wentThroughRight = true;
		if(wentThroughLeft == false) {
			pacmanXPos = 0;
			pacmanYPos = 220;
		}
	}
	wentThroughLeft = false;
	wentThroughRight = false;
	// PORTAL COLLISION END
	// DOT COLLISION IN MAZEUPDATE() ---
	// GHOST COLLISION IN CLASS
}

function mazeUpdate() {
	//fill(0, 0 , 204);
	var tmpX = 0;
	var tmpY = 0;
	var count = 0;
	for(var i = 0; i < maze.length; i++) {
		for(var j = 0; j < maze[i].length; j++) {
			if (count == 27) {	// new line of map
				tmpY += 20;
				tmpX = 0;
				count = 0;
			}
			if (maze[i][j] == 1) {
				fill(0, 0 , 204);
				rect(tmpX, tmpY, 20, 20);
			}
			if(maze[i][j] == 3) {
				if(pacmanXPos == tmpX && pacmanYPos == tmpY) {
					maze[i][j] = 2;
					score += 10;
				}
				else {
					fill(255);
					ellipse(tmpX+10, tmpY+10, 5, 5);
				}
			}
			tmpX += 20;
			count++;
		}
	}
}


function ghost(x, y, order) {	// ghost class
	this.xPos = x;
	this.yPos = y;
	this.xSpeed = 0;
	this.ySpeed = 0;
	this.ord = order;
	this.upValid = false;
	this.downValid = false;
	this.leftValid = false;
	this.rightValid = false;
	this.rand;
	this.count;
	this.tmpRand;

	this.displayGhost = function() {
		if(this.ord == 1)
			image(red, this.xPos, this.yPos);
		if(this.ord == 2)
			image(pink, this.xPos, this.yPos);
		if(this.ord == 3)
			image(blue, this.xPos, this.yPos);
		if(this.ord == 4)
			image(cyan, this.xPos, this.yPos);
		//fill(255);
		//rect(this.xPos, this.yPos, 20, 20);
	}

	this.generateMove = function() {	// set Interval this function
		this.rand = Math.floor(Math.random() * 4) + 1;
		var holdX = this.xPos;
		var holdY = this.yPos;
		if(this.rand == 1) {
			//this.ySpeed = -20;
			//this.xSpeed = 0;
			this.yPos -= 20;
		}
		if(this.rand == 2) {
			//this.ySpeed = 20;
			//this.xSpeed = 0;
			this.yPos += 20;
		}
		if(this.rand == 3) {
			//this.ySpeed = 0;
			//this.xSpeed = 20;
			this.xPos += 20;
		}
		if(this.rand == 4) {
			//this.ySpeed = 0;
			//this.xSpeed = -20;
			this.xPos -= 20;
		}
		//this.xPos += this.xSpeed;
		//this.yPos += this.ySpeed;
		var count = 0;
		var tmpX = 0;
		var tmpY = 0;
		for(var i = 0; i < maze.length; i++) {
			for(var j = 0; j < maze[i].length; j++) {
				if (count == 27) {	// new line of map
					tmpY += 20;
					tmpX = 0;
					count = 0;
				}
				if(maze[i][j] == 1 && this.xPos == tmpX && this.yPos == tmpY) {
					this.xPos = holdX;
					this.yPos = holdY;
					//this.randMove();
					return;
				}
				if(maze[i][j] == 5 && this.xPos == tmpX && this.yPos == tmpY) {
					this.xPos = holdX;
					this.yPos = holdY;
					//this.randMove();
					return;
				}
				tmpX += 20;
				count++;
			}
		}		
	}

	this.kill = function() {
		var dis = dist(this.xPos, this.yPos, pacmanXPos, pacmanYPos);
		if (dis < 1) {
			console.log('Ghosted');
			pacmanXPos = 260;
			pacmanYPos = 280;
			pacmanXSpeed = 0;
			pacmanYSpeed = 0;
			pacmanLives--;
			if(pacmanLives == 0) {
				console.log("Game Over");
				gameOver();
			}
		}
	}
}

function updateScreen() {
	mazeUpdate();
	pacman = createVector(pacmanXPos, pacmanYPos);
	if(startedMoving == false) {
		image(playerImage, pacman.x, pacman.y);
	}
	if(pacmanXSpeed == 20 && pacmanYSpeed == 0) {
		image(playerImage, pacman.x, pacman.y);
		lastPlayerImage = 1;
	}
	if(pacmanXSpeed == -20 && pacmanYSpeed == 0) {
		image(playerImage2, pacman.x, pacman.y);
		lastPlayerImage = 2;
	}
	if(pacmanYSpeed == 20 && pacmanXSpeed == 0) {
		image(playerImage4, pacman.x, pacman.y);
		lastPlayerImage = 4;
	}
	if(pacmanYSpeed == -20 && pacmanXSpeed == 0) {
		image(playerImage3, pacman.x, pacman.y);
		lastPlayerImage = 3;
	}
	if(pacmanXSpeed == 0 && pacmanYSpeed == 0) {
		if(lastPlayerImage == 1)
			image(playerImage, pacman.x, pacman.y);
		if(lastPlayerImage == 2)
			image(playerImage2, pacman.x, pacman.y);
		if(lastPlayerImage == 3)
			image(playerImage3, pacman.x, pacman.y);
		if(lastPlayerImage == 4)
			image(playerImage4, pacman.x, pacman.y);
	}
}

function gameOver() {
	death = true;
	document.getElementById('game').style.opacity = 0.1;
	document.getElementById('gOver').innerHTML = "Game Over!";
	document.getElementById('gOverText').innerHTML = "Your Score: " + score + "";
	document.getElementById('gOverEsc').innerHTML = "Click to Continue";
	score = 0;
}

function won() {
	death = true;
	document.getElementById('game').style.opacity = 0.1;
	document.getElementById('gOver').innerHTML = "You Won!";
	document.getElementById('gOverText').innerHTML = "Your Score: " + score + "";
	document.getElementById('gOverEsc').innerHTML = "Click to Continue";
	score = 0;
}

function mousePressed() {
	if(death == true) {
		window.location.reload(); // simple way to restart for now
	}
}

function kbhit() {
	if(keyIsDown(87) || keyIsDown(38)) {
		console.log("w or up");
			movingUp = true;
			movingDown = false;
			movingLeft = false;
			movingRight = false;
		if (!collisionYUp) {
			pacmanXSpeed = 0;
			pacmanYSpeed = -20;
		}
	}
	if(keyIsDown(83) || keyIsDown(40)) {
		console.log("s or down");
			movingDown = true;
			movingUp = false;
			movingRight = false;
			movingLeft = false;
		if (!collisionYDown) {
			pacmanXSpeed = 0;
			pacmanYSpeed = 20;
		}
	}
	if(keyIsDown(65) || keyIsDown(37)) {
		console.log("a or left");
			startedMoving = true;
			movingLeft = true;
			movingRight = false;
			movingUp = false;
			movingDown = false;
		if (!collisionXLeft) {
			pacmanXSpeed = -20;
			pacmanYSpeed = 0;
		}
	}
	if(keyIsDown(68) || keyIsDown(39)) {  
		console.log("d or right");
			console.log('here');
			startedMoving = true;
			movingRight = true;
			movingLeft = false;
			movingUp = false;
			movingDown = false;
		if (!collisionXRight) {
			pacmanXSpeed = 20;
			pacmanYSpeed = 0;
		}
	}
	if(startedMoving) {
		pacmanXPos += pacmanXSpeed;
	}
	if(startedMoving) {
		pacmanYPos += pacmanYSpeed;
	}
}