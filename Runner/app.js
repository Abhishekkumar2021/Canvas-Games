const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.shadowOffsetX = 10;
ctx.shadowOffsetY = -10;
ctx.shadowColor = "rgb(0,0,0,0.1)";
h = canvas.height;
w = canvas.width;
let id;
let time = 0;
let isGameOver = false;
//The ball
class Ball {
	constructor() {
		this.x = 50;
		this.y = h - 50;
		this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
		this.speed = Math.random() * 3 + 3;
	}
	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, 50, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
}
let isKeydown = false;
let key = "";
class Bar {
	constructor() {
		this.h = Math.floor((Math.random() * h) / 1.5) + 200;
		this.y = h - this.h;
		this.x = Math.floor(Math.random() * (w - 50)) + w / 2;
		this.color = `hsl(${Math.floor(Math.random() * 360)},50%,50%)`;
		this.speed = Math.random() * 3 + 2;
	}
	draw() {
		ctx.beginPath();
		ctx.rect(this.x, this.y, 50, this.h);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	update() {
		this.x = this.x - this.speed;
		if (this.x < -50) this.x = w;
	}
}

// Draw bars
function drawBars(bars) {
	for (let bar of bars) bar.draw();
}
function updateBars(bars) {
	for (let bar of bars) bar.update();
}
function isCollide(bars, ball) {
	for (let bar of bars) {
		if (bar.x - ball.x > -50 && bar.x - ball.x <= 40 && bar.y - ball.y < 40) {
			isGameOver = true;
			return true;
		}
	}
}

let numBars = 4;
let bars = [];
for (let i = 0; i < numBars; i++) {
	bars.push(new Bar());
}
let ball = new Ball();
function main() {
	ctx.clearRect(0, 0, w, h);
	drawBars(bars);
	updateBars(bars);
	ball.draw();
	if (ball.y < h - 50 && !isKeydown) ball.y = ball.y + ball.speed;
	else if (isKeydown) {
		if (key === "ArrowUp") {
			if (ball.y > 54) ball.y = ball.y - ball.speed;
			else ball.y = h - 50;
		} else if (key === "ArrowRight") {
			if (ball.x < w - 50) ball.x = ball.x + ball.speed;
			if (ball.y < h - 50) ball.y = ball.y + ball.speed;
			else ball.x = 50;
		}
	}

	// calling again
	id = requestAnimationFrame(main);
	if (isCollide(bars, ball)) cancelAnimationFrame(id);
	else {
		time += 1 / 60;
		document.querySelector("h1").innerText = time.toFixed(2) + " sec";
	}
	if (time % 20 < 0.03) {
		bars.push(new Bar());
		console.log(bars.length);
	}
}

main();

document.addEventListener("keydown", (evt) => {
	key = evt.key;
	isKeydown = true;
});
document.addEventListener("keyup", (evt) => {
	isKeydown = false;
});

const button = document.querySelector("button");
button.addEventListener("click", () => {
	cancelAnimationFrame(id);
	time = 0;
	isGameOver = false;
	bars = [];
	for (let i = 0; i < numBars; i++) {
		bars.push(new Bar());
	}
	ball = new Ball();
	main();
});
