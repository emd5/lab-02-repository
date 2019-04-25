'use strict';

console.log('app.js linked');

let optionsArray = [];
let page1Data = './data/page-1.json';
let page1Class = 'page1';
let page2Data = './data/page-2.json';
let page2Class = 'page2';

// An image constructor
function Image(image_url, title, description, keyword, horns){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  imageArray.push(this);
}

const imageArray = [];

// This loads the image data
function loadData(incomingData){
  $.get( incomingData, data => {
    data.forEach( (element) => {
      new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
      return imageArray;
    });
  }).then(potato =>
    potato.forEach(element => {
      displayImages(element.image_url, element.title);
    })).then( () =>
    imageArray.forEach(element => {
      displayOptions(element.keyword);
    }))
}

// This displays images onto the page
function displayImages(image_url, title){
  $('ul').append(`<li><img src="${image_url}" alt="${title}" /></li>`);
}

// Create for each to retrieve keyword and append it to the option element onto the page
function displayOptions(keyword){

  if (optionsArray.includes(keyword)){
    console.log('Duplicate found');
    return;
  }
  // check if select does not exists, do something
  optionsArray.push(keyword);
  $('select').append(`<option>${keyword}</option>`);
}

// Filter based on option selection
function filterImages(keyword){
  $('ul').empty();
  imageArray.forEach(element => {
    if(element.keyword === keyword){
      displayImages(element.image_url, element.title);
    }
  })
}

//Eventhandler function
function optionHandler(){
  console.log($('option:selected').text());
  filterImages($('option:selected').text());
}

function buttonHandler (){
  $('ul').empty();
  $('select').empty();

  //check the current class, then pass the desired class (the other class) to classToggler
  if($('.paginator').hasClass(page1Class)){
    classToggler(page2Class);
  }else if($('.paginator').hasClass(page2Class)){
    classToggler(page1Class);
  }

}

function classToggler(desiredClass){
  if (desiredClass === page1Class){
    $('.paginator').removeClass(page2Class);
    $('.paginator').addClass(page1Class);
    loadData(page1Data);
  }else if(desiredClass === page2Class){
    $('.paginator').removeClass(page1Class);
    $('.paginator').addClass(page2Class);
    loadData(page2Data);
  }else {
    console.log('Data not recognized');
  }



    
}

//Eventlisteners
$('select').off();
$('select').on('change', optionHandler);

$('.paginator').on('click', buttonHandler);

// Driver
classToggler(page1Class);















