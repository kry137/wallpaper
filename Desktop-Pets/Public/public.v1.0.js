let mousePos = { x: 0, y: 0 };
let smoothPos = { x: 0, y: 0 };
let smoothingFactor = 0.1;
let minDistanceSquared = 1; // Minimal jarak kuadrat untuk update 

document.addEventListener("mousemove", function (e) {
  mousePos.x = e.clientX - window.innerWidth / 2;
  mousePos.y = e.clientY - window.innerHeight / 2;
});

function updateSmoothPos() {
  let dx = mousePos.x - smoothPos.x;
  let dy = mousePos.y - smoothPos.y;
  let distanceSquared = dx * dx + dy * dy;

  if (distanceSquared > minDistanceSquared) {
    smoothPos.x += dx * smoothingFactor;
    smoothPos.y += dy * smoothingFactor;
  }

  requestAnimationFrame(updateSmoothPos);
}

updateSmoothPos();

function GetParents(collections, parentClassName) {
  let parents = [];

  for (let i = 0; i < collections.length; i++) {
    const element = collections[i];
    const parent = element.parentElement;

    let newParent = document.createElement("div");
    newParent.classList.add(parentClassName);

    // Gantikan posisi element dengan newParent
    parent.replaceChild(newParent, element);
    newParent.appendChild(element);

    parents.push(newParent);
  }

  return parents;
}
