
var stack = [];
var oldColor;
var fillColor
var drawmode = true;
let img;

function preload() {
  img = loadImage('./images/1.jpg');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  noSmooth();
  fillColor = color(0, 255, 0);
  image(img, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function matches(c, x, y) {
  var i = 4 * (y * width + x);
  return (
    pixels[i + 0] === c[0] &&
    pixels[i + 1] === c[1] &&
    pixels[i + 2] === c[2] &&
    pixels[i + 3] === c[3]
  );
}

function draw() {
  if (!stack.length) return;
  while (stack.length) {
  var p = stack.pop();
  var x1 = p.x,
    y = p.y;
  while (x1 > 0 && matches(oldColor, x1 - 1, y)) x1--;

  var spanAbove = false,
    spanBelow = false;

  var x2 = x1 + 1;
  var ip = 4 * (y * width + x2);
  while (x2 < width && matches(oldColor, x2, y)) {
    for (var i = 0; i < 4; i++)
      pixels[ip++] = fillColor.levels[i];

    if (y > 0 && spanAbove !== matches(oldColor, x2, y - 1)) {
      if (!spanAbove) stack.push({
        x: x2,
        y: y - 1
      });
      spanAbove = !spanAbove;
    }
    if (y < height - 1 && spanBelow !== matches(oldColor, x2, y + 1)) {
      if (!spanBelow) stack.push({
        x: x2,
        y: y + 1
      });
      spanBelow = !spanBelow;
    }
    x2++;
  }
}
  updatePixels();
  console.log('draw')
}

// function ) {
//   if (keyIsDown(SHIFT)) return;
// }

function mouseDragged() {
	if (drawmode) {

		stroke(255);
		strokeWeight(2);
		line(pmouseX, pmouseY, mouseX, mouseY);
	} else {
    oldColor = get(mouseX, mouseY);
    loadPixels();
    stack = [];
    stack.push({
      x: mouseX,
      y: mouseY
    });
  }
}

function drawmodeSwitch() {
	drawmode = !drawmode;
}