//- jQuery test
// $(document).ready(function () {
//   $("#my-div").click(function () {
//     $(this).hide();
//   });
// });

let font;
let fontSize = 40;
let score = 0;
let ship;
let asteroids = [];
//let tempLaser = new Laser();
let lasers = [];

function preload() {
  font = loadFont("./assets/SourceCodePro-Regular.otf");
}

function setup() {
  createCanvas(windowWidth * 0.75, windowHeight * 0.75);

  // Set text characteristics
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  // Render text to canvas
  textAlign(CENTER);
  drawWords(width * 0.5);

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i]) && ship.intact == true) {
      console.log("yer ded");
      //- Currently this runs out of control... something is wrong
      //- with the for loop in ship.breakup()
      ship.intact = false;
      asteroids = asteroids.concat(ship.breakup());
      break;
    }
    //-console.log("asteroids is:", asteroids);
    //-console.log("i is:", i);
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  for (let i = lasers.length - 1; i >= 0; i--) {
    //-console.log("lasers is ", lasers);
    lasers[i].render();
    lasers[i].update();
    for (let j = asteroids.length - 1; j >= 0; j--) {
      if (lasers[i].hits(asteroids[j])) {
        if (asteroids[j].r > 10) {
          let newAsteroids = asteroids[j].breakup();
          asteroids = asteroids.concat(newAsteroids);
          // console.log("newAsteroids is: ", newAsteroids);
          // console.log("asteroids is: ", asteroids);
          score++;
        }
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }

  if (ship.intact == true) {
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }

  //- Auto-turn for debugging
  //ship.turn(0.1);
}

function drawWords(x) {
  fill(50);
  text(`Your score: ${score}`, x, 80);
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
