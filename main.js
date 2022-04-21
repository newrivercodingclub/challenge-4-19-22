class Rain {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
  }
  set setX(newX) {
    this.x = newX;
  }
  set setY(newY) {
    this.y = newY;
  }
  get getY() {
    return this.y;
  }
  get getX() {
    return this.x;
  }
  get getCtx() {
    return this.ctx;
  }
  get getCanvas() {
    return this.canvas;
  }
  get getSize(){
    return this.size;
  }
  set setSize(new_size){
    this.size = new_size;
  }
  //draws a rectangle at object's coordinates
  spawnRain() {
    this.ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  //iterates the y position down and re-draws rectangle
  rainFall() {
    this.y += 5;
    this.spawnRain();
  }
  slideRight(){
    this.x += 5;
    this.spawnRain();
  }
  slideLeft(){
    this.x -= 5;
    this.spawnRain();
  }
}

class Rectangle{
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get getX(){
    return this.x
  }
  set setX(new_x){
    this.x = new_x;
  }
  get getY(){
    return this.y;
  }
  set setY(new_y){
    this.y = new_y;
  }
  get getWidth(){
    return this.width;
  }
  set setWidth(new_width){
    this.width = new_width;
  }
  get getHeight(){
    return this.height;
  }
  set setHeight(new_height){
    this.height = new_height;
  }

}
let plaform;
let platform2;

function init() {
  let canvas = document.getElementById("canvas");
  canvas.height = window.innerHeight * 0.7;
  canvas.width = window.innerWidth * 0.7;
  platform = new Rectangle(
    canvas.width / 2 - 100, 
    canvas.height / 2 - 50,
    200,
    50
    )
  platform2 = new Rectangle(
    canvas.width + 50, 
    canvas.height + 100,
    200,
    50
    )
}

//create global array to store raindrop objects in
rainDrops = [];
rainStarted = false;
function startRain() {
  //if the screen has only been clicked once, drop rain
  if (!rainStarted) {
    rainStarted = true;
    //call function to generate raindrops
    createRain();
    //call function to move rain down the screen
    makeRainFall();
  } else {
    rainStarted = false;
  }
}

function createRain() {
  //generate an array of 500 raindrops with random x and y coordinates
  for (let i = 0; i < 500; i++) {
    randomX = Math.random() * window.innerWidth;
    randomY = -100 + Math.random() * 50;
    rainDrops.push(new Rain(randomX, randomY));
    rainDrops[i].spawnRain();
  }
  //continue generating rain until screen is clicked again
  if (rainStarted) {
    setTimeout(createRain, 500);
  }
}

function makeRainFall() {
  //clear the previous frame
  rainDrops[0].getCtx.clearRect(
    0,
    0,
    rainDrops[0].getCanvas.width,
    rainDrops[0].getCanvas.height
  );
  //draw platform
  drawPlatform();
  //draw each new raindrop
  for (let i = 0; i < rainDrops.length; i++) {
    if(rainDrops[i].getX + rainDrops[i].getSize - 1 > platform.getX &&
      rainDrops[i].getX < platform.getX + platform.getWidth &&
      rainDrops[i].getY + rainDrops[i].getSize - 1> platform.getY &&
      rainDrops[i].getY < platform.getY + platform.getHeight){
        if(rainDrops[i].getX < platform.getX + platform.getWidth / 2){
          rainDrops[i].slideLeft();
        }else{
          rainDrops[i].slideRight();
        }
    }else{
        rainDrops[i].rainFall();
        //if raindrop is offscreen, remove it from the array
        if (rainDrops[i].getY > window.innerHeight) {
          rainDrops.splice(i, 1);
        }
      }
  }
  //call a new frame every 33 ms until rain is stopped
  if (rainStarted) {
    setTimeout(() => makeRainFall(), 33);
  }
}

function drawPlatform() {
  //draw a brown platform in the middle of the screen
  rainDrops[0].getCtx.fillStyle = "rgb(130, 65, 0)";
  rainDrops[0].getCtx.fillRect(
    platform.getX,
    platform.getY,
    platform.getWidth,
    platform.getHeight
  );
  rainDrops[0].getCtx.fillStyle = "rgba(0, 0, 255, 0.5)";
}

//add event listeners to load init function on document load and trigger rain movement onclick
window.addEventListener("load", init);
document.body.addEventListener("click", startRain);
