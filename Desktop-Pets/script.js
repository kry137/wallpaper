
const pets = [];
let speedMult = 1;
let animSpeedMult = 1;

let windowWidth, windowHeight;
let scaledWidth, scaledHeight;
function Resize() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  scaledWidth = windowWidth / BGSIZE;
  scaledHeight = windowHeight / BGSIZE;
}
Resize(); // Jalankan pertama kali
window.addEventListener("resize", Resize); // Jalankan ketika ukuran window berubah


const rotationArea = document.getElementById("pets-rotation-area");
function livelyPropertyListener(name, val) {
  switch (name) {
    case "pets":
      let splittedPets = val.toLowerCase().split(";");

      for (let i = 0; i < splittedPets.length; i++) {
        const petObject = pets[i] || undefined;
        const petName = splittedPets[i];
        let petData = petsData[petName];

        if (!petData) petData = petsData["undefined"];

        // Kalau udah ada, timpa
        if (petObject instanceof Pet && !(petObject.name == petName)) {
          // console.log("Udah ada, tapi enggak sama");
          pets[i].Declare(
            petName, petData.sprite, petData.spritesize, petData.animations, petData.animationdelay, petData.speed, "~"
          );
        }
        // Kalau belum ada, bikin baru
        else if (!(petObject instanceof Pet)) {
          // console.log("Enggak ada, bikin baru");

          pets[i] = new Pet(
            petName, petData.sprite, petData.spritesize, petData.animations, petData.animationdelay, petData.speed
          );

          pets[i].setPos(Math.random() * windowWidth);
        }

      }

      while (pets.length > splittedPets.length) {
        let pet = pets.pop();
        pet.kill();
      }
      break;

    case "speedmult":
      speedMult = val;
      break;
    case "animspdmult":
      animSpeedMult = val;
      break;

    default:
      break;
  }
}

// EKSPERINMENTAL FITUR LivelyProperties DI BROWSER (DEVELOPMENT ONLY)
if (DEBUG) {
  fetch("LivelyProperties.json")
    .then(res => res.json())
    .then(c => {

      const input = document.createElement("input");
      input.type = "text";
      input.id = "InputTest";
      input.style.position = "absolute";
      input.style.zIndex = "100";
      input.style.left = "0";
      input.style.bottom = "0";
      input.value = c.pets.value;

      document.body.appendChild(input);

      livelyPropertyListener("pets", c.pets.value);

      document.getElementById("InputTest").addEventListener("input", (event) => {
        livelyPropertyListener("pets", event.target.value);
      });
    });
    
}

document.addEventListener("DOMContentLoaded", () => {

  //#region Preparement
  // let petsAmount = "bird;frog"
  // let splittedPets = petsAmount.split(";");

  // for (let i = 0; i < splittedPets.length; i++) {
  //   const petName = splittedPets[i];
  //   const petData = petsData[petName];

  //   pets[i] = new Pet(
  //     petName, petData.sprite, petData.spritesize
  //   );
  // }
  //#endregion

  //#region Posisikan pet di lokasi random pada awal permainan
  // {
  //   pets.forEach((pet) => {
  //     let randomPos = Math.random() * windowWidth;
  //     pet.setPos(randomPos);
  //   })
  // }
  //#endregion

  //#region Update (Dijalankan per frame)
  function Update() {

    pets.forEach(pet => {
      pet.Update();
    });

    requestAnimationFrame(Update);
  }
  requestAnimationFrame(Update);
  //#endregion
});