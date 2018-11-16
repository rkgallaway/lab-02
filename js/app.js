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
      });
    })
    .then(Images.loadPics)
    .then(keywordDropDown)
    .then(hornsDropDown)
} 

Images.loadPics = () => {
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
    $('#keyword-search').append($('<option>', {value: ele, text: ele}));
  })
}

const hornsDropDown = function() {
  const hornItems = [];  //make global variable?  and set array to zero on change when other items are hidden? however we'd need to on click functions?
  Images.allPic.forEach(value => {
    if (!hornItems.includes(value.horns)){
      hornItems.push(value.horns)
    }
  })
  hornItems.forEach((ele) => {
    $('#horn-search').append($('<option>', {value: ele, text: ele}));
  })
}

$(() => Images.readJson(1));

// below is new location  --same effect
$('li').on('click', function() {
  let $whereToGo = $(this).attr('id');
  console.log($whereToGo);
  //need to empty the select options when clicked. is repopulating that array
  $('main div').hide();
  Images.readJson($whereToGo);
})
//above is new location

// keyword select menu filtering
$('#keyword-search').on('change', function(){
  let $keywordSelection = $(this).val();
  // $('#keyword-search').empty();  this how to empty but misplaced...
  $('main div').hide()
  $(`div[class="${$keywordSelection}"]`).show() 
})

// horn select menu filtering

$('#horn-search').on('change', function(){
  let $hornSelection = $(this).val();
  $('main div').hide()
  //change class to horn number? it is currently keyword. change and then it will render or add a diff identifier? add a 2nd class?
  $(`div[class="${$hornSelection}"]`).show() 
})

//original location
// $('li').on('click', function() {
//   let $whereToGo = $(this).attr('id');
//   console.log($whereToGo);
//   //need to empty the select options when clicked. is repopulating that array
//   $('main div').hide();
//   Images.readJson($whereToGo);
// })


