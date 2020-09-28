setTimeout(function () {
  var bannerImg = document.getElementById('banner');
  var bgImages = [
    // bgimages
  ];

  bannerImg.src = bgImages[((Math.random(Date.now()) * bgImages.length) >> 0)];
}, 0);
