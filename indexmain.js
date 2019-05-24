const MAX_COL = 8;
const MAX_ROW = 6;
const SIZE_BLOCK = 56; // width (or height which ever is bigger) + margin (left-right)
const BLOCK = "<div class='block'><div class='rect'></div></div>";

let $blocks = null;
let blocksCenter = [];

function fillWall(doc_w, doc_h, block_size, max_row, max_col){
  // first we figure the amount of columsn and rows needed;
  let num_columns = Math.floor(doc_w / block_size);
  num_columns = max_col < num_columns ? max_col : num_columns;
  let num_rows = Math.floor(doc_h / block_size);
  num_rows = max_row < num_rows ? max_row : num_rows;
  let wall = '';
  for(let i = 0; i < num_rows; i++){
    let row = "<div class='row'>";
    for(let j = 0; j < num_columns; j++){
      row += BLOCK;
    }
    row += "</div>";
    wall += row;
  }
  return wall;
}

function resizeFunction(){
  let window_w = $(document).width();
  let window_h = $(document).height();
  let wall = fillWall(window_w, window_h, SIZE_BLOCK, MAX_ROW, MAX_COL);
  $('.wall').html(wall);
}

function getBlockCenters($blocks){
  let blocksCenter = [];
  for(let i = 0; i < $blocks.length; i++){
    $e = $($blocks[i]);
    blocksCenter.push([$e.offset().left + $e.width() / 2, $e.offset().top + $e.height() / 2]);
  }
  return blocksCenter
}

$( window ).resize(function() {
  // console.log('resized');
  // console.table([$(document).height(), $(document).width()]);
  resizeFunction();
  $blocks = $('.block');
  blocksCenter = getBlockCenters($blocks);
});

$( document ).ready(function() {
  resizeFunction();
  $blocks = $('.block');
  blocksCenter = getBlockCenters($blocks);
});

$(window).mousemove((e) => {
  for(let i = 0; i < $blocks.length; i++){
    let angle = Math.atan2(e.pageX- blocksCenter[i][0],- (e.pageY- blocksCenter[i][1]) )*(180/Math.PI);
    $($blocks[i]).css({ "-webkit-transform": 'rotate(' + (angle || 0) + 'deg)'});
    $($blocks[i]).css({ '-moz-transform': 'rotate(' + (angle || 0) + 'deg)'});
    $($blocks[i]).css({ 'transform': 'rotate(' + (angle || 0) + 'deg)'});
  }
});
