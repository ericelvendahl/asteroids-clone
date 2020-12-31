//- jQuery test
// $(document).ready(function () {
//   $("#my-div").click(function () {
//     $(this).hide();
//   });
// });

let ship;
let asteroids = [];
//let tempLaser = new Laser();
let lasers = [];

function setup() {
  createCanvas(windowWidth * 0.75, windowHeight * 0.75);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    //console.log("lasers is ", lasers);
    lasers[i].render();
    lasers[i].update();
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])) {
        let newAsteroids = asteroids[j].breakup();
        asteroids = asteroids.concat(newAsteroids);
        console.table("newAsteroids is: ", newAsteroids);
        console.log("asteroids is: ", asteroids);
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  //- Auto-turn for debugging
  //ship.turn(0.1);
}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == " ") {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
