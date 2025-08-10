//#region DRAW THE SHAPES
function drawShapesFrSample(context, sample, triangles) {

  triangles.forEach(({ color, points }) => {
    if (points.length == 0) return;

    const coor1 = sample[points[0]];

    // console.log(coor1);

    context.beginPath();
    context.moveTo(coor1[0], coor1[1]);
    for (let i = 1; i < points.length; i++) {
      const coori = sample[points[i]];
      context.lineTo(coori[0], coori[1]);
    }
    context.closePath();
    context.fillStyle = color || "transparent";
    context.fill();
    context.strokeStyle = color || "black"; // Warna garis tepi
    context.stroke();
  });

  return canvas;
}
//#endregion DRAW THE SHAPES

//#region ANIMATION FOR INTEGER VALUE
function easeVal(totalFPS, currFrame) {
  const t = currFrame / totalFPS;
  return 0.5 * (1 - Math.cos(Math.PI * t));
}
//#endregion ANIMATION FOR INTEGER VALUE

//#region COMPRESS IMAGE
function compressCanvas(canvas, quality = 0.8) {
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, 'image/webp', quality);
    });
}
//#endregion COMPRESS IMAGE

