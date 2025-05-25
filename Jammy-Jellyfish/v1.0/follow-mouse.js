
document.addEventListener("DOMContentLoaded", function () {
    let elements = document.getElementsByClassName("follow-mouse");

    let followMouse = GetParents(elements, "follow-mouse-parent");
    let followIntensity = Array.from(elements, el => el.getAttribute("fm-intensity") || 0);

    delete elements;

    if (DEBUG) {
        console.log(followMouse);
        console.log(followIntensity);
    }

    let mousePosCached = { x: 0, y: 0 };
    function Update(){
        if (smoothPos.x !== mousePosCached.x || smoothPos.y !== mousePosCached.y) {
            // if (DEBUG) console.log(`${JSON.stringify(mousePosCached)} != ${JSON.stringify(mousePos)}`);
            
            mousePosCached = Object.assign({}, smoothPos);
            for (let i = 0; i < followMouse.length; i++) {
                const element = followMouse[i];
                const intensity = followIntensity[i];

                element.style.transform = `translate(${smoothPos.x * intensity}px, ${smoothPos.y * intensity}px)`;
            }
        }
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
});