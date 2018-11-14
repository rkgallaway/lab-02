'use strict';

function Images(pic) {
  this.title = pic.title;
  this.image_url = pic.image_url;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
}

Images.allPic = [];

Images.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let picClone = $('div[class="clone"]');

  let picHtml = $('#photo-template').html();

  picClone.html(picHtml)

  picClone.find('h2').text(this.title);
  picClone.find('img').attr('src', this.image_url);
  picClone.find('p').text(this.description);
  picClone.removeClass('clone');
  picClone.attr('class', this.keyword);
}

Images.readJson = () => {
  $.get('data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Images.allPic.push(new Images(obj));
      })
    })
    .then(Images.loadPics)
} 

Images.loadPics= () => {
  Images.allPic.forEach(pic => pic.render())
}

$(() => Images.readJson());
