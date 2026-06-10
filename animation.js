const BACKGROUND = "black";
const FOREGROUND = "green";

const game = document.getElementById("game");

function resizeCanvas() {
    game.width = window.innerWidth;
    game.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// dynamic resize on window resolution changes
window.addEventListener("resize", resizeCanvas);

const ctx = game.getContext("2d");

function clearCanvas() {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height);
}

function drawPoint({ x, y }) {
    const pointSize = 5;
    
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
}

// Converts normal coordinate points into screen's coordinate points
// normal: (X/Y: -1..0..1), screen: (X: 0..screen.width, Y: 0..screen.height)
function normalizedToScreen(point) {
    const uniformScale = Math.min(game.width, game.height);
    const offsetX = (game.width - uniformScale) / 2;
    const offsetY = (game.height - uniformScale) / 2;

    return {
        x: (point.x + 1) / 2 * uniformScale + offsetX,
        y: ((point.y * -1) + 1) / 2 * uniformScale + offsetY
    };
}

// Converts 3D coords to 2D
function project({ x, y, z }) {
    return {
        x: x / z,
        y: y / z
    };
}

// animates object movements at Z plane
function translate_Z({ x, y, z }, dz) {
    return { x, y, z: z + dz };
}

// animates rotation
function rotate_XZ_Plane({x, y, z}, angle) {
    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    
    return {
        x: (x * cosAngle) - (z * sinAngle),
        y,
        z: (z * cosAngle) + (x * sinAngle)
    };
}

function drawLine(point1, point2) {
    ctx.strokeStyle = FOREGROUND;
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(point1.x, point1.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke();
}

const points = [
    { x: -0.5, y: 0.5, z: 0.5 },
    { x: 0.5, y: 0.5, z: 0.5 },
    { x: 0.5, y: -0.5, z: 0.5 },
    { x: -0.5, y: -0.5, z: 0.5 },

    { x: -0.5, y: 0.5, z: -0.5 },
    { x: 0.5, y: 0.5, z: -0.5 },
    { x: 0.5, y: -0.5, z: -0.5 },
    { x: -0.5, y: -0.5, z: -0.5 }
];

const faces = [
    [0, 1, 2, 3], // front face
    [4, 5, 6, 7], // back face
    [0, 4], [1, 5], [2, 6], [3, 7] // intersection of two faces
];

const FPS = 60;

let dz = 1;
let angle = 0;

function frame() {
    const dt = 1 / FPS;
    
    dz += 1 * dt;
    angle += Math.PI * dt;

    clearCanvas();

    for (const p of points) {
        const rotated_XZ_Plane = rotate_XZ_Plane(p, angle);
        const translated_Z = translate_Z(rotated_XZ_Plane, dz);
        const projectionPoint = project(translated_Z);
        const finalPoint = normalizedToScreen(projectionPoint);
        
        drawPoint(finalPoint);
    }


    for(const f of faces) {
        const faceLength = f.length;

        for(let i = 0; i < faceLength; ++i) {
            const pointA = points[f[i]];
            const rotated_XZ_Plane = rotate_XZ_Plane(pointA, angle);
            const translated_Z = translate_Z(rotated_XZ_Plane, dz);
            const projectionPoint = project(translated_Z);
            const A = normalizedToScreen(projectionPoint);

            const pointB = points[f[(i+1) % faceLength]];
            const rotated_XZ_Plane2 = rotate_XZ_Plane(pointB, angle);
            const translated_Z2 = translate_Z(rotated_XZ_Plane2, dz);
            const projectionPoint2 = project(translated_Z2);
            const B = normalizedToScreen(projectionPoint2);

            drawLine(A, B);
        }
    }

    setTimeout(frame, 1000 / FPS);
}

setTimeout(frame, 1000 / FPS);
