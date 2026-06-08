const BACKGROUND = "black";
const FOREGROUND = "green";

const game = document.getElementById("game");

function resizeCanvas() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
}

resizeCanvas(); // Initial resize - to set the canvas dimensions to the current window size

window.addEventListener("resize", resizeCanvas); // dynamically resizes the canvas after window resolution changes

const ctx = game.getContext("2d");

function clearCanvas() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height); // fills the whole canvas with fillStyle color
}

function drawPoint({ x, y }) {
    const pointSize = 10;
    
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
}

function screen(p) {

    const size = Math.min(game.width, game.height);

    return {
        x: (p.x + 1) / 2 * size + (game.width - size) / 2,
        y: ((p.y * -1) + 1) / 2 * size + (game.height - size) / 2
    }
}

function project({ x, y, z }) {
    return {
        x: x / z,
        y: y / z
    }
}


const points = [
    { x: 0.5, y: 0.5, z: 0.5 },
    { x: -0.5, y: 0.5, z: 0.5 },
    { x: 0.5, y: -0.5, z: 0.5 },
    { x: -0.5, y: -0.5, z: 0.5 },

    { x: 0.5, y: 0.5, z: -0.5 },
    { x: -0.5, y: 0.5, z: -0.5 },
    { x: 0.5, y: -0.5, z: -0.5 },
    { x: -0.5, y: -0.5, z: -0.5 }
]

function translate_z({ x, y, z }, dz) {
    return { x, y, z: z + dz }
}

const fps = 300;
let dz = 1;

function frame() {
    const dt = 1 / fps;
    dz += 1 * dt;
    clearCanvas();

    for (const p of points) {
        drawPoint(screen(project(translate_z(p, dz))));
    }

    //point(screen(project({x: 0.5, y: 0.5, z: 1 + dz})));
    //console.log(dt + " " + dz);
    setTimeout(frame, 1000 / fps);
}
setTimeout(frame, 1000 / fps);

