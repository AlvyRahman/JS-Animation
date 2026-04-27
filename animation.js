const BACKGROUND = "black";
const FOREGROUND = "green";

const game = document.getElementById("game");

function resize() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const ctx = game.getContext("2d");
console.log(game.width, game.height);

function clear() {
    // the border
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height);
}

function point({ x, y }) {
    //draw a point inside the canvas
    //alert(x)
    const s = 10;
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(x - s / 2, y - s / 2, s, s);
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
    clear();

    for (const p of points) {
        point(screen(project(translate_z(p, dz))));
    }

    //point(screen(project({x: 0.5, y: 0.5, z: 1 + dz})));
    //console.log(dt + " " + dz);
    setTimeout(frame, 1000 / fps);
}
setTimeout(frame, 1000 / fps);

// -- use this if you wanna close the windows upon user input
//close the screensaver when the mouse moves
/*
let lastX, lastY;

document.addEventListener("mousemove", e => {
    if (lastX !== undefined) {
        if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
            window.close();
        }
    }
    lastX = e.clientX;
    lastY = e.clientY;
});

document.addEventListener("keydown", () => window.close());
*/
