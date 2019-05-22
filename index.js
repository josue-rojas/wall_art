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

  mouseAngle(mouse_e, canvasTopLeft){
    let y = mouse_e.pageY - canvasTopLeft[1] + this.center_y;
    let x = mouse_e.pageX - canvasTopLeft[0] + this.center_x;
    // let y = canvasTopLeft[1] + this.center_y + mouse_e.pageY;
    // let x = canvasTopLeft[0] + this.center_x + mouse_e.pageX ;
    return Math.atan2(y, x);

    // return -Math.atan2(mouse_e.pageY - canvasTopLeft[1] , mouse_e.pageX - canvasTopLeft[0] );

    // return -Math.atan2(mouse_e.pageY - canvasTopLeft[1] + this.center_y, -(mouse_e.pageX - canvasTopLeft[0] + this.center_x));

    // return Math.atan2(mouse_e.pageX - canvasTopLeft[0]+this.center_x- canvasTopLeft[mouse_e.pageX);
    // return 90;
  }

  // i found the rotatation of multi shapes confusing but this was helpful
  rotate(ctx, mouse_e, canvasTopLeft){
    let angle = mouse_e && canvasTopLeft ? this.mouseAngle(mouse_e, canvasTopLeft) : null;
    console.log(angle)
    ctx.save();
    ctx.translate(this.center_x, this.center_y);
    ctx.fillStyle = 'rgb(234, 191, 48)';
    angle = null;
    ctx.rotate(angle ? angle : (Math.PI / 180) * (this.angle));
    this.angle = (this.angle + 1)%360;
    ctx.fillRect(-this.w/2, -this.h/2, this.w, this.h);
    ctx.restore();
  }

  draw(ctx){
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.w, this.h);
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
  blocks = fillCanvasBlocks(500, 500, 15, 50);
  // blocks = fillCanvasBlocks(500, 500, 50, 15);
  // window.requestAnimationFrame(draw);
  // blocks[0].consoleState();
  // blocks[1].consoleState();
}


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


function draw(mouse_e, canvasTopLeft){

  // ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas


  for(let i = 0; i < blocks.length; i++){
    // blocks[i].rotate(ctx, mouse_e);
  }
  // console.log(canvasTopLeft);
  blocks[30].rotate(ctx, mouse_e, canvasTopLeft);

  // requestAnimationFrame(draw);
}

init();
requestAnimationFrame(draw);

var $canvas=$("#canvas");
const canvasTopLeft=[$canvas.offset().left, $canvas.offset().top]
// console.log(canvasTopLeft);

$('#canvas').mousemove((event) => {
  console.log(canvasTopLeft);

  draw(event, canvasTopLeft);
  console.log(event.pageX);
});
