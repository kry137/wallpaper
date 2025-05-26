class Pet {
  constructor(name, sprite, size, animation, animDelay, movSpd, positionX) {
    this.parentEl = document.createElement("div");
    this.parentEl.classList.add("pet-parent");
    rotationArea.appendChild(this.parentEl);

    this.element = document.createElement("div");
    this.element.classList.add("pet");
    this.parentEl.appendChild(this.element);

    this.Declare(name, sprite, size, animation, animDelay, movSpd)

    {
      this.moveDelay = this.moveDelayAvg * (Math.random() - 0.3);
      // this.element
      this.element.style.transform = `scale(${scaledHeight * this.direction} ${scaledHeight})`;
    }
  }

  Declare(name, sprite, size, animation, animDelay, movSpd, posX) {
    this.name = name;
    
    this.element.style.background = `url(${sprite})`;
    this.element.style.width = size[0] + "px";
    this.element.style.height = size[1] + "px";

    this.positionX = (posX == "~") ? this.positionX : 0;
    this.elSize = this.element.offsetWidth;
    this.speed = movSpd * (0.8 + Math.random() * 0.4); // speed * (80% ~ 120%)

    this.isMoving = false;
    this.direction = 1; // 1 = Kanan; 2 = Kiri;
    this.moveDelay = 0;
    this.moveDelayAvg = 300;
    this.moveTarget = 0;

    this.spriteSize = { x: size[0], y: size[1] };
    /* animState:
      0 = idle
      1 = walk
     */
    this.animState = 0;
    this.animFrameTotal = animation; // Per animasi, dia punya berapa frame. Cnth [4, 6] => { Idle = 4 frame; Walk = 6 frame }
    this.animFrame = 0; // Sekarang ada di frame berapa
    this.animDelay = 0;
    this.animDelayTotal = animDelay;
  }

  Update() {
    if (!this.isMoving && this.moveDelay <= 0) {
      this.isMoving = true;

      let randomPos = Math.random() * windowWidth;
      randomPos = this.validateValue(randomPos);

      this.moveTarget = randomPos;
    }

    if (this.isMoving) {
      if (this.animState != 1) {
        this.animState = 1;
        this.animFrame = 0;

        this.animDelay = 0;
      };

      this.moveTo(this.moveTarget);
    }

    else {
      if (this.animState != 0) {
        this.animState = 0;
        this.animFrame = 0;

        this.animDelay = 0;
      };

      this.moveDelay--
    };

    this.animate();
  }

  setPos(value) {
    this.positionX = value;
    this.parentEl.style.transform = `translateX(${this.positionX}px)`;
  }

  moveTo(value) {
    this.direction = (value < this.positionX) ? -1 : 1;

    const velocity = this.speed * speedMult * this.direction;
    let newPos = this.positionX + velocity;

    // Jika sudah mencapai target
    if (Math.abs(newPos - value) < Math.abs(velocity)) {
      newPos = value;
      this.isMoving = false;
      this.moveDelay = this.moveDelayAvg * (Math.random() + 0.5);
    }

    this.parentEl.style.transform = `translateX(${newPos}px)`;
    this.positionX = newPos;
  }

  animate() {

    if (this.animDelay <= 0) {
      this.animDelay = this.animDelayTotal;

      this.animFrame++;
      if (this.animFrame >= this.animFrameTotal[this.animState]) this.animFrame = 0;

      this.element.style.backgroundPosition = `-${this.spriteSize.x * this.animFrame}px -${this.spriteSize.y * this.animState}px`;
      this.element.style.transform = `scale(${scaledHeight * this.direction}, ${scaledHeight})`;

      // console.log(this.animState, this.animFrame);
    }
    else {
      this.animDelay -= 1 * animSpeedMult;
    }
  }

  kill() {
    this.parentEl.remove();
  }

  validateValue(value) {
    value = Math.max(0, value);
    value = Math.min(value, windowWidth - this.elSize * scaledHeight);
    return value;
  }
}