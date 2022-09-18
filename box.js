function Box(x, y, z, r) {
  this.pos = createVector(x, y, z);
  this.r = r;

  this.generate = function() {
    let boxes = [];
    for (let x = -1; x < 2; x++) {
      for (let y = -1; y < 2; y++) {
        for (let z = -1; z < 2; z++) {
          let sum = abs(x) + abs(y) + abs(z);
          let newR = this.r / 3;
          if (sum > 1) {
            let b = new Box(
              this.pos.x + x * newR,
              this.pos.y + y * newR,
              this.pos.z + z * newR,
              newR
            );
            boxes.push(b);
          }
        }
      }
    }
    return boxes;
  };

  this.show = function() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    box(this.r);
    pop();
  };
}

var a = 0;

var sponge = [];

function setup() {
  createCanvas(400, 400, WEBGL);
  // as of p5.js 0.6.0, normal material is no longer the default and
  // has to be explicitly selected.
  normalMaterial();

  // An array of Box objects
  // Star with one
  var b = new Box(0, 0, 0, 200);
  sponge.push(b);
}

function mousePressed() {
  // Generate the next set of boxes
  var next = [];
  for (var i = 0; i < sponge.length; i++) {
    var b = sponge[i];
    var newBoxes = b.generate();
    next = next.concat(newBoxes);
  }
  sponge = next;
}

function draw() {
  background(51);
  rotateX(a);
  rotateY(a * 0.4);
  rotateZ(a * 0.1);
  // Show what you've got!
  for (var i = 0; i < sponge.length; i++) {
    sponge[i].show();
  }
  a += 0.01;
}
