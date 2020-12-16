const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
let canvasW = 0;
let canvasH = 0;

const resizeCanvas = () => {
	canvasW = window.innerWidth - 4;
	canvasH = window.innerHeight - 4;
	canvas.width = canvasW;
	canvas.height = canvasH;
};

const snowFlakes = [];

resizeCanvas();
window.addEventListener('resize', () => {
	resizeCanvas();
});

const drawBackground = () => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawSnowFlake = (x, y, index) => {
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
	ctx.fill();

	if (y > canvasH + 20) {
		removeSnowFlake();
	}
};

const generateSnowFlake = () => {
	snowFlakes.push({
		x: Math.random() * canvasW * 1.2 - canvasW * 0.2,
		y: -10,
	});
};

const removeSnowFlake = (index) => {
	snowFlakes.splice(index, 1);
};

const render = () => {
	generateSnowFlake();
	ctx.clearRect(0, 0, canvasW, canvasH);
	snowFlakes.forEach((snowFlake, index) => {
		snowFlake.x = snowFlake.x + 2;
		snowFlake.y = snowFlake.y + 12;

		drawSnowFlake(snowFlake.x, snowFlake.y, index);
	});
	window.requestAnimationFrame(render);
};

const initSnow = () => {
	window.requestAnimationFrame(render);
};

drawBackground();
initSnow();
