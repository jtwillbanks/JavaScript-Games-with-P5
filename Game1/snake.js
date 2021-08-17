/* Author: Jacob Willbanks */
/*-------------------------------------------------------|
| Javascript functionality for snake game for CMPS 2680  |
| Utilizing p5.js framework by Lauren McCarthy           |
| https://p5js.org/										 |			 
| Spring 2018 - April -> May   Final Project (Game1)     |
|-------------------------------------------------------*/


var snakeXSpeed = 0;
var snakeYSpeed = 0;
var snakeXPos = 240;
var snakeYPos = 300;
var tail = [];
var snack, snackX, snackY;
var tailLength = 1;
var score = 0;
var img1, img2;
var gamePaused = false;
var death = false;
//localStorage.removeItem('highs');
var highs = localStorage.getItem('highs') || 0;

// load images/sound/data_files
function preload() {
	// 20x20 images for snake(img1) and snack(img2)
	img1 = loadImage('./assets/derrickSnake.png');
	img2 = loadImage('./assets/snackSnake.png');
}

function setup() {
	frameRate(10); // rate of calling the draw function
	var can = createCanvas(500, 600);
	can.parent('game');
	generateSnack();	// choose random starting location for snack	
}

// Draw function recursively called from p5 framework
// Using draw as an "update" function for redrawing elements of the snake game
function draw() {
	if (gamePaused || death)
		return;
	collisionCheck(); // checks if snake hits itself or the wall
	background(25);	// redraw background black
	kbhit(); // checks if key is pressed and updates movement
	updateScreen(); // updates tail length and printing snake/snack
	document.getElementById('Score').innerHTML = "Score: "+ score +"";
	document.getElementById('hScores').innerHTML = "High Score: "+ highs +"";
}

function generateSnack() {
	// Generate Random Position for Snack x and y position(multiples of 20 -> 20x20)
	snackX = Math.round((Math.random()*(480-20)+20)/20)*20;
	console.log(snackX);
	snackY = Math.round((Math.random()*(580-20)+20)/20)*20;
	console.log(snackY);
	// Avoid Placing fruit in any tail element of snake
	for(var i = 0; i < tail.length; i++) {
		if(snackX == tail[i].x || snackY == tail[i].y){
			generateSnack();
		}
	}
}

function collisionCheck() {

	// Snake hits border
	if (snakeXPos > 500 || snakeYPos > 600 || snakeXPos < 0 || snakeYPos < 0)
		gameOver();

	// Snake hits itself
	for (var i = 0; i < tail.length-1; i++) {
		if (snakeXPos == tail[i].x && snakeYPos == tail[i].y)
			gameOver();
	}
	
	// Snake hits Snack
	if (snakeXPos == snackX && snakeYPos == snackY) {
		score += 10;
		generateSnack();
		tailLength++;
		console.log(tailLength);
		console.log("score");
	}
}

// redrawing screen to update based upon movement or new snack location
function updateScreen() {
	//fill(255);

	// Tail following path
	// storing last position of snake in each index to print the tail and
	// have it follow the path through decrementing in a loop
	if(tailLength == tail.length) {
		for (var i = 0; i < tail.length-1; i++) {
			tail[i] = tail[i+1];
		}
	}
	
	tail[tailLength-1] = createVector(snakeXPos, snakeYPos);

	for(var i = 0; i < tail.length; i++) {
		//image(img1, tail[i].x, tail[i].y);
		rect(tail[i].x, tail[i].y, 20, 20);
	}

	//image(img2, snackX, snackY);
	rect(snackX, snackY, 20, 20);
}

function gameOver() {
	console.log("Game Over");
	death = true;
	var tmpScore = score;
	document.getElementById('game').style.opacity = 0.5;
	document.getElementById('gOver').innerHTML = "Game Over";
	document.getElementById('gOverText').innerHTML = "Your Score: " + tmpScore + "";
	document.getElementById('gOverEsc').innerHTML = "Click to Continue";
	// Reset Global Variables
	snakeXPos = 240;
	snakeYPos = 300;
	snakeXSpeed = 0;
	snakeYSpeed = 0;
	tail = [];
	tailLength = 1;
	// Storing High Score in localStorage variable
	if(typeof(Storage) !== "undefined") {
		if (score > highs)
			highs = score;
			localStorage.setItem('highs', highs);
	}
	highs = localStorage.getItem('highs');
	console.log(highs);
	score = 0;
	generateSnack();
}

function kbhit() {
	//console.log("kbhit");
	if(keyIsDown(87) || keyIsDown(38)) {	//119
		console.log("w or up");
		//moveSnake('119');
		snakeXSpeed = 0;
		snakeYSpeed = -20;
	}
	if(keyIsDown(83) || keyIsDown(40)) {	//115
		console.log("s or down");
		//moveSnake('115');
		snakeXSpeed = 0;
		snakeYSpeed = 20;
	}
	if(keyIsDown(65) || keyIsDown(37)) {	// 97
		console.log("a or left");
		//moveSnake('97');
		snakeXSpeed = -20;
		snakeYSpeed = 0;
	}
	if(keyIsDown(68) || keyIsDown(39)) {  // 100
		console.log("d or right");
		//moveSnake('100');
		snakeXSpeed = 20;
		snakeYSpeed = 0;
	}
	snakeXPos += snakeXSpeed;
	snakeYPos += snakeYSpeed;
}

// Event Listener Function for checking if Game is Paused;
function keyPressed() {
	if(keyIsDown(27)) {
		console.log("Game Paused");
		pauseGame();
	}
}

function mousePressed() {
	if(death == true) {
		console.log("Game Restarted");
		document.getElementById('game').style.opacity = 1;
		document.getElementById('gOver').innerHTML = "";
		document.getElementById('gOverText').innerHTML = "";
		document.getElementById('gOverEsc').innerHTML = "";
		death = false;
		draw();
	}
}

function pauseGame() {
	if (!death) {
	gamePaused = !gamePaused;
	if (gamePaused) {
		document.getElementById('game').style.opacity = 0.5;
		document.getElementById('pause').innerHTML = "Paused";
	}
	if (!gamePaused) {
		document.getElementById('game').style.opacity = 1;
		document.getElementById('pause').innerHTML = "";
		console.log("Game UnPaused");
		draw();
	}
}
}

