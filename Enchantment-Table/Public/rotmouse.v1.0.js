
document.addEventListener("DOMContentLoaded", function () {
    let elements = document.getElementsByClassName("rotate-mouse");

    let rotateMouse = GetParents(elements, "rotate-mouse-parent");
    let rotateIntensityX = Array.from(elements, el => el.getAttribute("rm-intensity-x"));
    let rotateIntensityY = Array.from(elements, el => el.getAttribute("rm-intensity-y"));

    delete elements;

    if (DEBUG) {
        console.log(rotateMouse);
        console.log(rotateIntensityX);
        console.log(rotateIntensityY);
    }

    let mousePosCached = { x: 0, y: 0 };
    function Update(){
        if (smoothPos.x !== mousePosCached.x || smoothPos.y !== mousePosCached.y) {
            // if (DEBUG) console.log(`${JSON.stringify(mousePosCached)} != ${JSON.stringify(mousePos)}`);
            mousePosCached = Object.assign({}, smoothPos);

            for (let i = 0; i < rotateMouse.length; i++) {
                const element = rotateMouse[i];
                if (!element.classList.contains("rotate-mouse-parent")) continue;

                const x = rotateIntensityX[i];
                const y = rotateIntensityY[i];
                
                let rotateAmount = "";
                
                if (x) rotateAmount += `rotateX(${-smoothPos.y * x}deg) `;
                if (y) rotateAmount += `rotateY(${smoothPos.x * y}deg) `;
                
                // if (DEBUG) console.log(rotateAmount);
                element.style.transform = rotateAmount;
            }
        }
        requestAnimationFrame(Update);
    }
    requestAnimationFrame(Update);
});