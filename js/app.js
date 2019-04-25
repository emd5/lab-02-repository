'use strict';

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

let imageArray = [];

// This loads the image data
function loadData(incomingData){
  imageArray = [];
  $.get( incomingData, data => {
    data.forEach( (element) => {
      new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
    });
  }).then( () =>
    imageArray.forEach(element => {
      displayImages(element);
    })).then( () =>
    imageArray.forEach(element => {
      displayOptions(element.keyword);
    }))
}

function displayImages(object){
  const liRenderer = Handlebars.compile($('#li-template').html());
  $('ul').append(liRenderer(object));
}

// Create for each to retrieve keyword and append it to the option element onto the page
function displayOptions(keyword){
  if (optionsArray.includes(keyword)){
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
  filterImages($('option:selected').text());
}

function buttonHandler (){
  $('ul').empty();
  $('select').empty();
  if($('.paginator').hasClass(page1Class)){
    classToggler(page2Class);
  }else if($('.paginator').hasClass(page2Class)){
    classToggler(page1Class);
  }
}

function classToggler(desiredClass){
  optionsArray =[];
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

function sortImagesByTitle(){
  imageArray.sort((a,b) => a.title.localeCompare(b.title));
  $('ul').empty();
  imageArray.forEach(element => {
    displayImages(element);
  });
}

function sortImagesByHorns(){
  imageArray.sort((a,b) => a.horns - b.horns);
  $('ul').empty();
  imageArray.forEach(element => {
    displayImages(element);
  });
}

//Eventlisteners
$('select').off();
$('select').on('change', optionHandler);

$('.paginator').on('click', buttonHandler);

$('.titleButton').on('click', sortImagesByTitle);
$('.hornsButton').on('click', sortImagesByHorns);

// Driver
classToggler(page1Class);

