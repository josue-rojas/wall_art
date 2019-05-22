const Block = "<div class='block'></div>"

$blocks = $('.block');
//
// let blocksCenter = $blocks.map((e) => {
//   $e = $($blocks[e]);
//   // console.log('e',$e.offset().left + $e.width() / 2);
//   // console.log($e.offset().top + $e.height() / 2)
//   return [$e.offset().left + $e.width() / 2, $e.offset().top + $e.height() / 2];
// });

let blocksCenter = [];
for(let i = 0; i < $blocks.length; i++){
  $e = $($blocks[i]);
  blocksCenter.push([$e.offset().left + $e.width() / 2, $e.offset().top + $e.height() / 2]);
}

// let blocksCenter = $blocks.map((e) => [$($blocks[e]).offset().left + $($blocks[e]).width() / 2, $($blocks[e]).offset().top + $($blocks[e]).height() / 2]);
// console.table( blocksCenter)

$(window).mousemove((e) => {
  // console.log(e.pageX);
  for(let i = 0; i < $blocks.length; i++){
    // console.log(blocksCenter[i])
    let angle = Math.atan2(e.pageX- blocksCenter[i][0],- (e.pageY- blocksCenter[i][1]) )*(180/Math.PI);
    // console.log('angle', angle);
    $($blocks[i]).css({ "-webkit-transform": 'rotate(' + (angle || 0) + 'deg)'});
    $($blocks[i]).css({ '-moz-transform': 'rotate(' + (angle || 0) + 'deg)'});
    $($blocks[i]).css({ 'transform': 'rotate(' + (angle || 0) + 'deg)'});
    // $($blocks[i]).css({ 'background-color': 'red'});
  }
});
