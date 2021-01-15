const canvas = document.getElementById('ball-canvas');
const ctx = canvas.getContext('2d');

let posX = canvas.width / 2;
let posY = canvas.height / 2;
let holePosX = Math.random() * (canvas.width - 20) + 10;
let holePosY = Math.random() * (canvas.height - 20) + 10;

const drawBall = () => {
	calcPos();

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.arc(posX, posY, 5, 0, 2 * Math.PI);
	ctx.stroke();
};

drawHole = () => {
	ctx.beginPath();
	ctx.arc(holePosX, holePosY, 10, 0, 2 * Math.PI);
	ctx.stroke();
};

let acl = new Accelerometer({ frequency: 60 });
acl.addEventListener('reading', () => {
	if (posX > 0 && posX < canvas.width) {
		posX += acl.x;
	}
	if (posY > 0 && posY < canvas.height) {
		posY += acl.z;
	}
});
acl.start();

window.requestAnimationFrame(() => {
	drawBall();
	drawHole();
});
