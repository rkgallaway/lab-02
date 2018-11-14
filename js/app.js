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
    .then(dropmenu)
} 

Images.loadPics= () => {
  Images.allPic.forEach(pic => pic.render())
}

const dropmenu = function() {
  const items = [];
  Images.allPic.forEach(value => {
    if (!items.includes(value.keyword)){
      items.push(value.keyword)
    }
  })
  items.forEach((ele) => {
    $('select').append($('<option>', {text: ele}));
  })
}

$(() => Images.readJson());

// select menu filtering
$('select').on('change', function(){
  let $selection = $(this).val();
  $('div').hide()
  $(`div'[img="${$selection}"]`).show() //div has no class so this isnt working and need to work with it more so that only selected items show
})
