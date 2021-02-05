const canvas = document.getElementById('ball-canvas');
const ctx = canvas.getContext('2d');
const startTime = new Date();

window.addEventListener('deviceorientation', calcPosition, true);

let posX = canvas.width / 2;
let devG = 0;
let devB = 0;
let posY = canvas.height / 2;
let holePosX = Math.random() * (canvas.width - 20) + 10;
let holePosY = Math.random() * (canvas.height - 20) + 10;

function calcPosition(orientation) {
	devG = orientation.gamma;
	devB = orientation.beta - 90;
}

function canvasBg() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const drawBall = () => {
	ctx.beginPath();
	posX += devB * 0.01;
	posY += devG * 0.01;
	ctx.arc(posX, posY, 5, 0, 2 * Math.PI);
	ctx.stroke();
};

// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function checkWin() {
	if (posX < holePosX + 10 && posX + 5 > holePosX && posY < holePosY + 10 && posY + 5 > holePosY) {
		const winTime = new Date();

		document.getElementById('win').style.display = 'flex';
		const minutes = Math.floor((winTime.getTime() - startTime.getTime()) / 1000 / 60);
		const seconds = Math.floor(((winTime.getTime() - startTime.getTime()) / 1000) % 60);
		document.getElementById('time').innerText = `${minutes}:${seconds}`;
	}
}

drawHole = () => {
	ctx.beginPath();
	ctx.arc(holePosX, holePosY, 10, 0, 2 * Math.PI);
	ctx.stroke();
};

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	canvasBg();
	drawBall();
	drawHole();
	checkWin();
	window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
