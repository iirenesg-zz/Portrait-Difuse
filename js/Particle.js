const driftX = 3; // How much the particle drifts horizontally
const driftY = 10; // How much the particle drifts vertically
const particleSize = 2; // Size of each particle

export default class Particle {
  constructor(x, y, auto) {
    this.x = x;
    this.y = y;
    this.isMoving = true;
    this.isAutomatic = auto;
  }

  move() {
    this.x = this.x + random(0, driftX);
    this.y = this.y + random(0, driftY);
  }

  display(img) {
    const pixColor = img.get(this.x, this.y);
    noStroke();
    fill(pixColor[0] || 0, pixColor[1] || 0, pixColor[2] || 0);
    ellipse(this.x, this.y, particleSize, particleSize);
  }
}