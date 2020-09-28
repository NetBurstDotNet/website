setTimeout(function () {
  var bannerImg = document.getElementById('banner');
  var bgImages = [
    "/website/images/banners/ocean1.jpg",
"/website/images/banners/shutterstock_366857099.jpg",
"/website/images/banners/Thinking-of-getting-a-cat.png"
  ];

  bannerImg.src = bgImages[((Math.random(Date.now()) * bgImages.length) >> 0)];
}, 0);
