let canvas = document.getElementById("raytrace");
let ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(0, 0, 0,255)";
ctx.fillRect(0, 0, 256, 192);

let c = new Array(
    [-0.3, -0.8, 3],
    [0.9, -1.1, 2]
);

let q = new Array(0.6 * 0.6, 0.2 * 0.2);

for (let i = 0; i < 191; i++) {
    for (let j = 0; j < 255; j++) {
        let x = 0.3;
        let y = -0.5;
        let z = 0;
        let dx = j - 128;
        let dy = 96 - i;
        let dz = 300;
        let dd = dx * dx + dy * dy + dz * dz;
        draw(x, y, z, dx, dy, dz, dd, i, j);
    }
}

function draw(x, y, z, dx, dy, dz, dd, i, j) {
    let n = (y > 0) | (dy <= 0);
    if (!n) {
        var s = -y / dy;
    }
    for (let k = 0; k < c.length - 1; k++) {
        let px = c[k][0] - x;
        let py = c[k][1] - y;
        let pz = c[k][2] - z;
        let pp = px * px + py * py + pz * pz;
        let sc = px * dx + py * dy + pz * dz;
        if (sc <= 0) {
            continue;
        }
        let bb = sc * sc / dd;
        let aa = q[k] - pp + bb;
        if (aa <= 0) {
            continue;
        }
        sc = (Math.sqrt(bb) - Math.sqrt(aa)) / Math.sqrt(dd);
        if (sc < s || n < 0) {
            n = k;
        }
        s = sc;
    }

    if (n < 0) {
        return;
    }

    dx = dx * s;
    dy = dy * s;
    dz = dz * s;
    dd = dd * s * s;
    x = x + dx;
    y = y + dy;
    z = z + dz;

    if (n !== 0) {
        let nx = x - c[n - 1][0];
        let ny = y - c[n - 1][1];
        let nz = z - c[n - 1][2];
        let nn = nx * nx + ny * ny + nz * nz;
        let l = 2 * (dx * nx + dy * ny + dz * nz) / nn;
        dx = dx - nx * l;
        dy = dy - ny * l;
        dz = dz - nz * l;
        draw(x, y, z, dx, dy, dz, dd, i, j);
    }

    for (let k = 0; k < c.length - 1; k++) {
        let u = c[k][0] - x;
        let v = c[k][2] - z;
        if (u * u + v * v <= q[k]) {
            return;
        }
    }
    if ((x - Math.floor(x) > 0.5) !== (z - Math.floor(z) > 0.5)) {
        drawPixel(j, i, 255);
    }
    return;
}

function drawPixel(x, y, c) {
    let r = c, g = c, b = c, a = 255;
    ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + (a / 255) + ")";
    ctx.fillRect(x, 192 - y, 1, 1);
}