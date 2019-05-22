function toRadians (angle) {
  return angle * (Math.PI / 180);
}
const rad90 = toRadians(90);
const COS90 = Math.cos(rad90);
const SIN90 = Math.sin(rad90);

class Block {
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.angle = 0;
    this.center_x = x + 0.5 * w;
    this.center_y = y + 0.5 * h;
    // this.draw = this.draw.bind(this);
  }

  consoleState(){
    console.log('x', this.x);
    console.log('y', this.y);
    console.log('h', this.h);
    console.log('w', this.w);
    console.log('center_x', this.center_x);
    console.log('center_y', this.center_y);
    console.log('angle', this.angle);

  }

  // i found the rotatation of multi shapes confusing but this was helpful
  rotate(ctx, angle){
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.save();
    // console.log(this.center_x);
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.translate(this.center_x, this.center_y);
    ctx.fillStyle = 'rgb(234, 191, 48)';
    // ctx.translate(250, 250);
    ctx.rotate((Math.PI / 180) * this.angle);
    // ctx.rotate((Math.PI / 180) * 90);
    this.angle = (this.angle + 1)%360;
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    // ctx.translate(-this.center_x, -this.center_y);
    // ctx.translate(-250, -250);

    // ctx.translate(0, 0);
    ctx.restore();
  }

  draw(ctx){
    // consol
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.w, this.h);
    // ctx.translate(this.center_x, this.center_y);
    // ctx.rotate((Math.PI / 180) * 1);
    // ctx.translate(-this.center_x, -this.center_y);
  }
}

// TODO: fix for shorter side space
// a function to fill a canvas with blocks, returns array of blocks in their positions
function fillCanvasBlocks(canvas_w, canvas_h, block_w, block_h){
  let min_margin = 10; // default
  let max_block_size = (block_w > block_h ? block_w : block_h) + min_margin; // since the block rotates the max is to avoid touching the top or bottom
  // then we figure out how many columns and rows we have
  let num_columns = Math.floor(canvas_w / max_block_size);
  let num_rows = Math.floor(canvas_h / max_block_size);
  // then we find the difference between each center point
  let colunm_space = (canvas_w  - (num_columns * block_w)) / (num_columns + 1);
  let row_space = (canvas_h  - (num_rows * (block_w))) / (num_rows + 1);
  // console.log(colunm_space, row_space);
  // console.log(num_rows, num_columns);
  // and finally we create the blocks with the specs
  let blocks = [];
  let x = colunm_space;
  let y = row_space;
  for(let i = 0; i < num_columns; i++){
    for(let j = 0; j < num_rows; j++){
      blocks.push(new Block(x, y, block_w, block_h));
      y += row_space + block_w;
    }
    // blocks.push(new Block(x, y, block_w, block_h));
    x += colunm_space + block_w;
    y = row_space;
  }
  return blocks;
}

let block1 = null;
let blocks = [];
function init(){
  block1 = new Block(25, 25, 50, 15);
  // blocks = fillCanvasBlocks(500, 500, 15, 50);
  blocks = fillCanvasBlocks(500, 500, 50, 15);
  window.requestAnimationFrame(draw);
  blocks[0].consoleState();
  blocks[1].consoleState();
}


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

requestAnimationFrame(draw);

function draw(){

  // ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
  // ctx.save();
// rgb(228, 79, 64)
  // let time = new Date();
  // canvas.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  // canvas.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 600) * time.getMilliseconds());
  // block1.rotate(ctx);
  // block1.draw(ctx);
  // block1.rotate(ctx);
  // ctx.rotate((Math.PI / 180) * 1);
  // ctx.save();

  for(let i = 0; i < blocks.length; i++){
    // blocks[i].draw(ctx);
    blocks[i].rotate(ctx);
  }
  // blocks[0].rotate(ctx);
  // blocks[1].rotate(ctx);


  // console.log('block1', block1)

  // window.requestAnimationFrame(draw);
  requestAnimationFrame(draw);
}

init();
