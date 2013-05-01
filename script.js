slidesToImagesMapper = {'1': '1', '2':'2', '3':'2', '4': '4'};
//currentSlide = 1;
//scrollListener = true;
//slides = $('.slide');

$(document).ready(function(){
    generateImageDivs();
    resizeSlideDivs();
});

window.onresize = function(event) {
    resizeSlideDivs();
};

var generateImageDivs = function() {
    var images = {};
    // get unique image names out of the mapper dict
    $.each(slidesToImagesMapper, function(index, key){
      var value = slidesToImagesMapper[key];
      images[value] = 1;
    });
    // make a image tag for each image
    $.each(images, function(imageNum){
      var domString = '<img src="backgrounds/' + imageNum + '.jpg" class="bg" id="bg' + imageNum + '"/>';
      $('#bg-wrapper').append(domString);
    });
    $('#bg1').addClass('opaque');
};

var resizeSlideDivs = function() {
    vpw = $(window).width();
    vph = $(window).height();
    $('.slide').css({'height': vph + 'px'});
};

window.onscroll = function(event){
    //console.log('scroll');
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    //console.log(docViewTop + ' ' + docViewBottom);

    $.each(slides, function(index, slide){
      var elemTop = $(slide).offset().top;
      var elemBottom = elemTop +$(slide).height();
      var elemNum = slidesToImagesMapper[$(slide).attr('id').slice(5)];
      //if (parseInt(elemNum, 10) != currentSlide) {
        if (parseInt(docViewBottom, 10) + 20 > parseInt(elemTop, 10)) {
          $('#bg-wrapper .opaque').removeClass('opaque');
          //console.log('#bg' + parseInt(elemNum, 10));
          $('#bg' + parseInt(elemNum, 10)).addClass('opaque');
          //currentSlide = parseInt(elemNum, 10);
        }
      //}
    });
};