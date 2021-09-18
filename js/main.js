import Particle from './Particle.js';

const emitRadius = 20; // Radius for the particle emission interaction
const maxParticles = 5000; // Max number of particles (this is a safe net to avoid )
const particlePersist = 0.89; // How long will the particles move (from 0 to 1)
const particleEmission = 15; // How many particles are emitted per frame

const withImageOpacity = true; // Visible image in the background 
const imageOpacity = 0.15; // Background image opacity (from 0 to 1)

const withAutomaticParticles = false; // Automatic particles enabled
const automaticEmission = 1; // How many particles emitted automatically each frame

let img;
const particles = [];

window.preload = () => {
  img = loadImage('artista1.png');
}

window.setup = () => {
  createCanvas(515, 688);
  pixelDensity(1);

  loadPixels();
  img.loadPixels();
  img.resize(515,688);
  
  if (withImageOpacity) {
    image(img, 0, 0);
    fill(`rgba(0, 0, 0, ${1 - imageOpacity})`);
    rect(0, 0, width, height);
  } else {
    background(0);
  }
}

window.draw = () => {
  for (let i = particles.length - 1; i >= 0; i--) {
    const particle = particles[i];

    particle.move();
    particle.display(img);

    if (!particle.isAutomatic && random() > particlePersist) {
      particle.isMoving = false;
    }

    if (!particle.isMoving || particle.x > width || particle.y > height) {
      particles.splice(i, 1);
    }
  }

  if (withAutomaticParticles) {
    emitParticles(random(0, width), 0, automaticEmission, true);
  }
}

window.mouseMoved = () => {
  emitParticles(mouseX, mouseY, particleEmission, false);
}

window.mouseDragged = () => {
  emitParticles(mouseX, mouseY, particleEmission, false);
}

function emitParticles(x, y, numParticles, auto) {
  if (particles.length < maxParticles) {
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle(x + Number(random(-emitRadius, emitRadius)), y + Number(random(-emitRadius, emitRadius)), auto));
    }
  }
}