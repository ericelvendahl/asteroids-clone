// $(document).ready(function () {
//   $("#my-div").click(function () {
//     $(this).hide();
//   });
// });
let ship;
function setup() {
  createCanvas(windowWidth * 0.75, windowHeight);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.update();

  //- Auto-turn for debugging
  //ship.turn(0.1);
}

function keyReleased() {
  ship.setRotation(0);
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boost();
  }
}

function Ship() {
  this.pos = createVector(width / 2, height / 2);
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0, 0);

  this.boost = function () {
    let force = p5.Vector.fromAngle(this.heading);
    this.vel.add(force);
  };

  this.update = function () {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
  };

  this.render = function () {
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  };

  this.setRotation = function (a) {
    this.rotation = a;
  };

  this.turn = function (anle) {
    this.heading += this.rotation;
  };
}
