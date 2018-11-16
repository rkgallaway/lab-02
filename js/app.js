'use strict';

function Images(pic) {
  this.title = pic.title;
  this.image_url = pic.image_url;
  this.description = pic.description;
  this.keyword = pic.keyword;
  this.horns = pic.horns;
}

Images.allPic = [];

let pagePics = [];

Images.prototype.render = function() {
  // $('main').append('<div class="clone"></div>');
  // let picClone = $('div[class="clone"]');

  // let picHtml = $('#photo-template1').html();

  // picClone.html(picHtml)

  // picClone.find('h2').text(this.title);
  // picClone.find('img').attr('src', this.image_url);
  // picClone.find('p').text(this.description);
  // // picClone.removeClass('clone');
  // picClone.attr('class', this.keyword);
  const source = $('#image-div-template').html();
  // console.log(source);
  // 2. Use Handlebars to "compile" the HTML
  const template = Handlebars.compile(source);
  // console.log('template', template);
  // 3. Do not forget to return the HTML from this method
  return template(this);
}

Images.readJson = (pageNumber) => {
  Images.allPic = [];
  $.get(`data/page-${pageNumber}.json`, 'json')
    .then(data => {
      data.forEach(obj => {
        Images.allPic.push(new Images(obj));
      })
    })
    .then(Images.loadPics)
    .then(dropmenu)
} 

Images.loadPics= () => {
  Images.allPic.forEach(pic => $('main').append(pic.render()));
}

const dropmenu = function() {
  const items = [];
  Images.allPic.forEach(value => {
    if (!items.includes(value.keyword)){
      items.push(value.keyword)
    }
  })
  items.forEach((ele) => {
    $('select').append($('<option>', {value: ele, text: ele}));
  })
}

$(() => Images.readJson(1));
// $(() => Images.readJson(2));

// select menu filtering
$('select').on('change', function(){
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show() 
})

$('li').on('click', function() {
  let $whereToGo = $(this).attr('id');
  console.log($whereToGo);
  $('main div').hide();
  Images.readJson($whereToGo);
  // $('main').show();
  // $('#' + $whereToGo).fadeIn(500)
})


