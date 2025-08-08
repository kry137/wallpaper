
//#region FUNCTION FOR DEBUGGING
function drawCircle(pos, text = "", color = "red", radius = 3) {
    if (!pos) return;

    const [x, y] = pos;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();

    if (text || text == 0) {
        ctx.fillStyle = "black"; // Warna teks
        ctx.font = `12px sans-serif`; // Ukuran teks relatif terhadap radius
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x, y);
    }
}
//#endregion FUNCTION FOR DEBUGGING

//#region DRAW THE SHAPES
function drawShapesFrSample(sample, triangles) {
    triangles.forEach(({ color, points }) => {
        if (points.length == 0) return;

        const coor1 = sample[points[0]];

        // console.log(coor1);

        ctx.beginPath();
        ctx.moveTo( coor1[0], coor1[1] );
        for (let i = 1; i < points.length; i++) {
            const coori = sample[points[i]];
            ctx.lineTo( coori[0], coori[1] );
        }
        ctx.closePath();
        ctx.fillStyle = color || "transparent";
        ctx.fill();
        ctx.strokeStyle = color || "black"; // Warna garis tepi
        ctx.stroke();

    });
}
//#endregion DRAW THE SHAPES

//#region ANIMATION FOR INTEGER VALUE
function createEaseLoop(duration = 1000) {
  let value = 0;
  let startTime = performance.now();

  function easeInOut(t) {
    return 0.5 * (1 - Math.cos(Math.PI * t));
  }

  function loop(now) {
    const elapsed = (now - startTime) % duration;
    const progress = elapsed / duration;

    const cycleProgress = progress < 0.5
      ? progress * 2
      : 2 - progress * 2;

    value = easeInOut(cycleProgress);
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);

  return {
    get value() {
      return value;
    }
  };
}
//#endregion ANIMATION FOR INTEGER VALUE

