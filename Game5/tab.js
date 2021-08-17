/* Author: Jacob Willbanks */
/*-------------------------------------------------------------|
| Javascript function for Tab on the Haters game for CMPS 2680 |
| Utilizing p5.js framework by Lauren McCarthy                 |
| https://p5js.org/										   	   |			 
| Spring 2018 - April -> May   Final Project (Game5)      	   |
|-------------------------------------------------------------*/


var started = false;
var rightDab = false;
var leftDab = false;
var tabCount = 0;
var done = false;
var img1, img2, img3;
//localStorage.removeItem('highs1');
var highs1 = localStorage.getItem('highs1') || 0;

var h2 = document.getElementsByTagName('h2')[0], seconds = 0, minutes = 0, hours = 0, t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
    //console.log(t);
}

function preload() {
	img1 = loadImage('./assets/StickMan2.png');
	img2 = loadImage('./assets/rightDab.png');
	img3 = loadImage('./assets/leftDab.png');
}

function setup() {
	var can = createCanvas(600, 600);
	can.parent('game');
}

function draw() {
	if(minutes == 1) {
		gameOver();
	}
	if(!started) {
		document.getElementById('start').style.left = "55px";
		document.getElementById('start').innerHTML = "PRESS TAB TO START!";
	}
	if(started && seconds < 30 && seconds > 0) {
		document.getElementById('start').style.left = "120px";
		document.getElementById('start').innerHTML = "Start Tabbing!!!";
	}
	if(started && seconds < 45 && seconds > 30) {
		document.getElementById('start').style.left = "110px";
		document.getElementById('start').innerHTML = "30 Seconds Left!";
	}
	if(started && seconds > 45) {
		document.getElementById('start').style.left = "130px";
		document.getElementById('start').innerHTML = "Keep Tabbing!!!"
	}
	background(255);
	drawMan();
	document.getElementById('hScores').innerHTML = "High Score: "+ highs1 +" tabs/min";
}

function gameOver() {
	started = false;
	done = true;
	rightDab = false;
	leftDab = false;
	h2.textContent = "00:00:00";
	clearTimeout(t);
	seconds = 0;
	minutes = 0;
	hours = 0;
	document.getElementById('start').style.opacity = 0;
	document.getElementById('game').style.opacity = 0.1;
	document.getElementById('gOver').innerHTML = "Times Up!";
	document.getElementById('gOverText').innerHTML = + tabCount + " tabs/min";
	document.getElementById('gOverEsc').innerHTML = "Click to Continue";
	// Storing High Score in localStorage variable
	if(typeof(Storage) !== "undefined") {
		if (tabCount > highs1)
			highs1 = tabCount;
			localStorage.setItem('highs1', highs1);
	}
	highs1 = localStorage.getItem('highs1');
	console.log(highs1);
	tabCount = 0;
}

function drawMan() {
	if(!rightDab && !leftDab) {
		image(img1, 100, 200);
	}
	else if(!rightDab && leftDab) {
		image(img3, 100, 200);
	}
	else {
		image(img2, 100, 200);
	}
}

function mousePressed() {
	if(done) {
		document.getElementById('game').style.opacity = 1;
		document.getElementById('gOver').innerHTML = "";
		document.getElementById('gOverText').innerHTML = "";
		document.getElementById('gOverEsc').innerHTML = "";
		document.getElementById('start').style.opacity = 1;
		done = false;
		started = false;
	}
}

function keyPressed() {
	if(keyCode == TAB) {
		if(!started && !done) {
			started = true;
			leftDab = true;
			tabCount++;
			timer();
			return;
		}
		if(!done) {
			console.log('Tabbed');
			leftDab = !leftDab;
			rightDab = !rightDab;
			tabCount++;
		}
	}
	console.log(tabCount);
}