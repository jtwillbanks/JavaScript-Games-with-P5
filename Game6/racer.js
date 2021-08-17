/* Author: Jacob Willbanks */
/*--------------------------------------------------------|
| Javascript function for Racer game for CMPS 2680        |
| Utilizing p5.js framework by Lauren McCarthy            |
| https://p5js.org/										  |			 
| Spring 2018 - April -> May   Final Project (Game6)      |
|--------------------------------------------------------*/

var car, playerCar, map;
var carArray = [];
var playerXPos = 200;
var playerYPos = 500;
var score = 0;
var death = false;
var gamePaused = false;
//localStorage.removeItem('highs');
var highs2 = localStorage.getItem('highs2') || 0;

function preload() {
	car = loadImage('./assets/greencar1.png');
	playerCar = loadImage('./assets/bluecar1.png');
	map = loadImage('./assets/RacerMap.png');
}

function setup() {
	var can = createCanvas(400, 700);
	can.parent('game');
	carArray.push(new Cars());
}

function draw() {
	if(death || gamePaused)
		return;
	background(map);
	for(var i = carArray.length-1; i >= 0; i--) {
		carArray[i].drawCars();
		carArray[i].updateCars();
		if(carArray[i].collisionDetect()) {
			gameOver();
		}
		if(carArray[i].createCars()) {
			carArray.splice(i, 1);
			score += 20;
			console.log(score);
		}
	}
	if(frameCount % 90 == 0)
		carArray.push(new Cars());	// possibly incriment score here ??
	drawPlayer();
	document.getElementById('Score').innerHTML = "Score: "+ score +"";
	document.getElementById('hScores').innerHTML = "High Score: "+ highs2 +"";
}	

function gameOver() {
	death = true;
	document.getElementById('game').style.opacity = 0.1;
	document.getElementById('gOver').innerHTML = "Crashed!";
	document.getElementById('gOverText').innerHTML = "Your Score: " + score + "";
	document.getElementById('gOverEsc').innerHTML = "Click to Continue";
	if(typeof(Storage) !== "undefined") {
		if (score > highs2)
			highs2 = score;
			localStorage.setItem('highs2', highs2);
	}
	highs2 = localStorage.getItem('highs2');
	score = 0;
	console.log("Game Over");
}

function drawPlayer() {
	image(playerCar, playerXPos, playerYPos);
	if(playerXPos > 300 || playerXPos < 0) {	// if player collides with sides
		gameOver();
	}
}

function Cars() {

	this.velocity = 6;	// speed going downwards
	this.yPos = -100;
	this.rand = Math.floor(Math.random() * 4) + 1; // assign the random positioning
	this.car1, this.car2, this.car3;

	this.createCars = function() {
		if(this.yPos > 800)
			return true;
		else
			return false;
	}

	this.collisionDetect = function() {
		var d; 	// check each car 1-3
		d = dist(playerXPos, playerYPos, this.car1.x, this.car1.y);
		if(d < 100)
			return true;
		d = dist(playerXPos, playerYPos, this.car2.x, this.car2.y);
		if(d < 100)
			return true;
		d = dist(playerXPos, playerYPos, this.car3.x, this.car3.y);
		if(d < 100)
			return true;
		return false;
	}

	this.drawCars = function() {	// generate random sets of 3 cars
		if(this.rand == 1) {
			image(car, 0, this.yPos);
			this.car1 = createVector(0, this.yPos);
			image(car, 100, this.yPos);
			this.car2 = createVector(100, this.yPos);
			image(car, 200, this.yPos);
			this.car3 = createVector(200, this.yPos);
		}
		if(this.rand == 2) {
			image(car, 0, this.yPos);
			this.car1 = createVector(0, this.yPos);
			image(car, 100, this.yPos);
			this.car2 = createVector(100, this.yPos);
			image(car, 300, this.yPos);			
			this.car3 = createVector(300, this.yPos);
		}
		if(this.rand == 3) {
			image(car, 0, this.yPos);
			this.car1 = createVector(0, this.yPos);
			image(car, 200, this.yPos);
			this.car2 = createVector(200, this.yPos);
			image(car, 300, this.yPos);
			this.car3 = createVector(300, this.yPos);
		}
		if(this.rand == 4) {
			image(car, 300, this.yPos);
			this.car1 = createVector(300, this.yPos);
			image(car, 200, this.yPos);
			this.car2 = createVector(200, this.yPos);
			image(car, 100, this.yPos);
			this.car3 = createVector(100, this.yPos);
		}
	}

	this.updateCars = function() {
		this.yPos += this.velocity;
	}

}

function pauseGame() {
	if (!death) {
	gamePaused = !gamePaused;
	if (gamePaused) {
		document.getElementById('game').style.opacity = 0.1;
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

function mousePressed() {
	if(death == true) {
		console.log("Game Restarted");
		document.getElementById('game').style.opacity = 1;
		document.getElementById('gOver').innerHTML = "";
		document.getElementById('gOverText').innerHTML = "";
		document.getElementById('gOverEsc').innerHTML = "";
		playerXPos = 200;
		playerYPos = 500;
		carArray = [];
		//carArray.push(new Cars());
		death = false;
		draw();
	}
}

function keyPressed() {
	/*if(keyIsDown(87) || keyIsDown(38)) {
		console.log("w or up");
		playerYPos -= 100;
	}
	if(keyIsDown(83) || keyIsDown(40)) {
		console.log("s or down");
		playerYPos += 100;
	}*/
	if(keyIsDown(65) || keyIsDown(37)) {
		console.log("a or left");
			playerXPos -= 100;
	}
	if(keyIsDown(68) || keyIsDown(39)) {  
		console.log("d or right");
			playerXPos += 100;
	}
	if(keyIsDown(27)) {
		console.log("Game Paused");
		pauseGame();
	}
}





