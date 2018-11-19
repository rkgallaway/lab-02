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
  const source = $('#image-div-template').html();
  const template = Handlebars.compile(source);
  return template(this);
}

Images.readJson = (pageNumber) => {
  Images.allPic = [];
  $.get(`data/page-${pageNumber}.json`, 'json')
    .then(data => {
      data.forEach(obj => {
        Images.allPic.push(new Images(obj));
      });
    })
    .then(Images.loadPics)
    .then(keywordDropDown)
    .then(hornsDropDown)
} 

Images.loadPics = () => {
  $('#photo-template1').innerHTML = '';
  Images.allPic.forEach(pic => $('main').append(pic.render()));
};

const keywordDropDown = function() {
  const keywordItems = [];
  Images.allPic.forEach(value => {
    if (!keywordItems.includes(value.keyword)){
      keywordItems.push(value.keyword)
    }
  })

  keywordItems.forEach((ele) => {
    $('#keyword-search').append($('<option>', {value: ele, text: ele, class: 'keyword-option'}));
  })
}

const hornsDropDown = function() {
  const hornItems = [];  
  Images.allPic.forEach(value => {
    if (!hornItems.includes(value.horns)){
      hornItems.push(value.horns)
    }
  })
  hornItems.forEach((ele) => {
    $('#horn-search').append($('<option>', {value: ele, text: ele, class: 'horn-option'}));
  })
}

$(() => Images.readJson(1));

// below is new location  --same effect
$('li').on('click', function() {
  let $whereToGo = $(this).attr('id');
  $('main div').remove();
  $('.keyword-option').remove();  
  $('.horn-option').remove();  
  Images.allPic = [];
  Images.readJson($whereToGo);
})
//above is new location

// keyword select menu filtering
$('#keyword-search').on('change', function(){
  let $keywordSelection = $(this).val();
  $('main div').hide(); 
  $(`div[class="${$keywordSelection}"]`).show();
})

// horn select menu filtering

$('#horn-search').on('change', function(){
  let $hornSelection = parseInt($(this).val());
  $('main div').hide();  
  for (let i = 0; i < Images.allPic.length; i++){
    if (Images.allPic[i].horns === $hornSelection) {
      $(`div[class="${Images.allPic[i].keyword}"]`).show()  
    }
  }
})


