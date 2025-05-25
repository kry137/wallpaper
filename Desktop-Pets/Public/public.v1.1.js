
//#region PUBLIC FUNCTIONS
function GetParents(collections, parentClassName) {
  let parents = [];

  for (let i = 0; i < collections.length; i++) {
    const element = collections[i];
    const parent = element.parentElement;

    let newParent = document.createElement("div");
    newParent.classList.add(parentClassName);
    if (element.classList.contains("threed-parent")) newParent.classList.add("three-d");

    // Gantikan posisi element dengan newParent
    parent.replaceChild(newParent, element);
    newParent.appendChild(element);

    parents.push(newParent);
  }

  return parents;
}
//#endregion

//#region REPOSITION
function Reposition() {

  Array.from(document.getElementsByClassName("repos")).forEach(el => { 
  
    const parent = el.parentElement;
    const newParent = document.createElement("div");

    newParent.style.position = "absolute";
    // newParent.style.left = `calc(${x} - ${width / 2}px)`;
    // newParent.style.top = `calc(${y} - ${height / 2}px)`;
    if (el.classList.contains("absolute")) newParent.classList.add("absolute");
    if (el.classList.contains("threed-parent")) newParent.classList.add("three-d");

    if (el.id) newParent.id = el.id + "-repos-parent";
    newParent.classList.add("repos-parent");

    const x = el.getAttribute("rpos-x") || 0;
    const y = el.getAttribute("rpos-y") || 0;

    newParent.setAttribute("rpos-x", x);
    newParent.setAttribute("rpos-y", y);

    // Gantikan posisi element dengan newParent
    parent.replaceChild(newParent, el);
    newParent.appendChild(el);

    el.classList.remove("repos");
  });

  Array.from(document.getElementsByClassName("repos-parent")).forEach(el => {
    const width = el.offsetWidth;
    const height = el.offsetHeight;

    const x = el.getAttribute("rpos-x") || 0;
    const y = el.getAttribute("rpos-y") || 0;

    el.style.left = `calc(${x} - ${width / 2}px)`;
    el.style.top = `calc(${y} - ${height / 2}px)`;
  });
}
Reposition();
//#endregion

//#region MOUSE 
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
//#endregion
