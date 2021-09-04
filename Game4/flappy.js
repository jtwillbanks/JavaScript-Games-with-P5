/* Author: Jacob Willbanks */
/*--------------------------------------------------------|
| Javascript function for Flappy Bird game for CMPS 2680  |
| Utilizing p5.js framework by Lauren McCarthy            |
| https://p5js.org/										  |			 
| Spring 2018 - April -> May   Final Project (Game3)      |
|--------------------------------------------------------*/

var tunnels = [];
var birdLift = 0;
var yPos;
var xPos = 30;
var birdFall = 0.6;	// gravity
var gamePaused = false;
var death = false;

function setup() {
	createCanvas(510, 600);
	tunnels.push(new Tunnel());
	yPos = height/2;
}

function draw() {
	if(gamePaused || death)
		return;
	background(25);
	updateBird();
	drawBird();
	tunnelCheck();
}

function drawBird() {
	fill(255);
	rect(xPos, yPos, 30, 30);
}

function tunnelCheck() {
	for(var i = tunnels.length-1; i >= 0; i--) {
		tunnels[i].display();
		tunnels[i].updateTunnels();
		//if(tunnels[i].hit)
		//	gameOver();
		if(tunnels[i].createTunnels())
			tunnels.splice(i, 1); // delete tunnel thats off the screen
	}

	if(frameCount % 75 == 0)
		tunnels.push(new Tunnel());
}

function Tunnel() {
	this.upper = random(height/6, 3/4 * height);
	this.gap = 170;
	this.lower = height - (this.upper + this.gap);
	this.xPos = width;
	this.velocity = 6;

	this.createTunnels = function() {
		if(this.xPos < -50)
			return true;
		else
			return false;
	}

	this.hit = function() {
	}	

	this.updateTunnels = function() {
		this.xPos -= this.velocity;
	}

	this.display = function() {
		fill(255);
		rect(this.xPos, 0, 50, this.upper);
		rect(this.xPos, height-this.lower, 50, this.lower);
	}
}

function updateBird() {
	birdLift += birdFall;
	yPos += birdLift;
	if(yPos > height) {
		yPos = height;
		birdLift = 0;
	}
	if(yPos == 600 || yPos < 0) {
		gameOver();
	}
}

function gameOver() {
	death = true;
	yPos = height/2;
	console.log('Game Over');
}

function keyPressed() {
	if(key == ' ') { // add space bar
		birdLift += -12;
	}
}

