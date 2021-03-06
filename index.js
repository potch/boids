let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');

let config = {
  count: 40,
  friction: 70,
  gravity: {
    active: true,
    threshold: 200
  },
  repulse: {
    active: true,
    threshold: 100,
    strength: 80
  },
  rubber: {
    active: false,
    threshold: 100,
    strength: 80
  },
  flock: {
    active: false,
    strength: 10,
    threshold: 100
  }
};

let boids = [];

function logify(n) {
  return (10 ** -(n / 10));
}

function gravity(a, b) {
  let r = a.range(b);
  let g = 1 * a.m * b.m / (r.distance * r.distance + 1);
  a.force(Math.cos(r.angle) * g, Math.sin(r.angle) * g);
}

function repulse(a, b, strength) {
  let r = a.range(b);
  let f = -strength / (r.distance + 1);
  a.force(Math.cos(r.angle) * f, Math.sin(r.angle) * f);
}

function rubber(a, b, strength) {
  let r = a.range(b);
  let f = strength * r.distance;
  a.force(Math.cos(r.angle) * f, Math.sin(r.angle) * f);
}

function flock(a, b, strength) {
  let r = a.range(b);
  a.force(Math.cos(b.a) * strength, Math.sin(b.a) * strength);
}

function frame() {
  let dt = Date.now() - lastFrame;
  lastFrame = Date.now();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (boids.length > config.count) {
    boids.pop();
  }
  if (boids.length < config.count) {
    boids.push(new Boid({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      s: 4,
      m: 5
    }));
  }
  boids.forEach(b => {
    boids.forEach((c, i) => {
      if (b === c) return;
      let r = b.range(c);
      if (config.gravity.active && r.distance > config.gravity.threshold) {
        gravity(b, c);
      }
      if (config.repulse.active && r.distance < config.repulse.threshold) {
        repulse(b, c, logify(100-config.repulse.strength));
      }
      if (config.rubber.active && r.distance > config.repulse.threshold) {
        rubber(b, c, logify(100-config.rubber.strength));
      }
      if (config.flock.active && r.distance < config.rubber.threshold) {
        flock(b, c, logify(100-config.rubber.strength));
      }
    });
  });

  ctx.strokeStyle = '#000';
  boids.forEach(b => b.draw(ctx));

  boids.forEach(b => {
    let f = 1 - logify(100 - config.friction);
    b.vx *= f;
    b.vy *= f;
    if (b.v > .1) {
      let s = .1 / b.v;
      b.vx *= s;
      b.vy *= s;
    }
    b.tick(100);
    if (b.x > canvas.width) {
      b.x = canvas.width;
      b.vx = -.99 * Math.abs(b.vx);
    }
    if (b.x < 0) {
      b.x = 0;
      b.vx = .99 * Math.abs(b.vx);
    }
    if (b.y > canvas.height) {
      b.y = canvas.height;
      b.vy = -.99 * Math.abs(b.vy);
    }
    if (b.y < 0) {
      b.y = 0;
      b.vy = .99 * Math.abs(b.vy);
    }
  });
  requestAnimationFrame(frame);
}

let lastFrame = Date.now();
frame();

window.addEventListener('keypress', function (e) {
  if (e.key === 'm') {
    menu.show();
  }
  if (e.key === 'Escape') {
    menu.hide();
  }

  if (e.key === 'f') {
    config.flock.active = !config.flock.active;
    toast('Flocking ' + (config.flock.active ? 'on' : 'off'));
  }
  if (e.key === 'g') {
    config.gravity.active = !config.gravity.active;
    toast('Gravity ' + (config.gravity.active ? 'on' : 'off'));
  }
  if (e.key === 'r') {
    config.repulse.active = !config.repulse.active;
    toast('Repulsion ' + (config.repulse.active ? 'on' : 'off'));
  }
  if (e.key === 'b') {
    config.rubber.active = !config.rubber.active;
    toast('Rubber Banding ' + (config.rubber.active ? 'on' : 'off'));
  }

  if (e.key === 's') {
    config.count++;
  }

  if (e.key === 'k') {
    config.count--;
  }

  menu.render();

});

let toastTimeout;
let toastEl = document.querySelector('.toast');
function toast(text, ms) {
  clearTimeout(toastTimeout);
  toastEl.innerHTML = text;
  toastEl.classList.add('show');
  toastTimeout = setTimeout(function () {
    toastEl.classList.remove('show');
  }, ms || 1000);
}

toast('press m for menu', 2000);

canvas.addEventListener('click', function (e) {
  menu.hide();
});
