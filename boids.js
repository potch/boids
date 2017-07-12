class Boid {

  constructor ({x, y, s, m}) {
    this.x = x;
    this.y = y;
    this.s = s || 1;
    this.m = m || 1;
    this.face = 0;
    this.vx = 0;
    this.vy = 0;
    this.fx = 0;
    this.fy = 0;
  }

  force (x, y) {
    this.fx += x;
    this.fy += y;
  }

  tick (t) {
    if (!this.fixed) {
      this.x += this.vx * t;
      this.y += this.vy * t;
    }
    this.vx += this.fx / this.m;
    this.vy += this.fy / this.m;
    this.fx = 0;
    this.fy = 0;
    this.face = this.face * .9 + this.a * .1;
  }

  range (b) {
    let dx = b.x - this.x;
    let dy = b.y - this.y;
    return {
      distance: Math.hypot(dx, dy),
      angle: Math.atan2(dy, dx)
    };
  }

  get a () {
    return Math.atan2(this.vy, this.vx);
  }

  get v () {
    return Math.hypot(this.vy, this.vx);
  }

  draw (ctx) {
    let s = this.s;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.face);
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(2 * s, 0);
    ctx.lineTo(-2 * s, -s);
    ctx.lineTo(-s, 0);
    ctx.lineTo(-2 * s, s);
    ctx.lineTo(2 * s, 0);
    ctx.stroke();
    ctx.restore();
  }
}
