function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = 0;
  this.intact = true;
  this.rotation = 0;
  this.vel = createVector(0, 0);
  this.isBoosting = false;

  this.boost = function () {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  };

  this.boosting = function (b) {
    this.isBoosting = b;
  };

  this.breakup = function () {
    let debris = [];
    if (this.intact == true) {
      console.log("No boom. debris is: ", debris);
      return debris;
    } else if (this.intact == false) {
      debris[0] = new Asteroid(this.pos, this.r);
      debris[1] = new Asteroid(this.pos, this.r);
      debris[2] = new Asteroid(this.pos, this.r);
      debris[3] = new Asteroid(this.pos, this.r);
      console.log("BOOM! debris is: ", debris);
      return debris;
    }
  };

  this.edges = function () {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  };

  this.hits = function (asteroid) {
    //-console.log(this.pos);
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  };

  this.render = function () {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    fill(0);
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
    pop();
  };

  this.setRotation = function (a) {
    this.rotation = a;
  };

  this.turn = function (anle) {
    this.heading += this.rotation;
  };

  this.update = function () {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  };
}
