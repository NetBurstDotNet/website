setTimeout(function () {
  var bannerImg = document.getElementById('banner');
  var bgImages = [
    "/images/banners/ocean1.jpg",
"/images/banners/shutterstock_366857099.jpg",
"/images/banners/Thinking-of-getting-a-cat.png"
  ];

  bannerImg.src = bgImages[((Math.random(Date.now()) * bgImages.length) >> 0)];
}, 0);
