'use strict';

console.log('app.js linked');

let optionsArray = [];
let page1Data = './data/page-1.json';
let page2Data = './data/page-2.json';

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
  $('select').empty();
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
  //clear html elements
  $('ul').empty();

  loadData(page2Data);
}

//Eventlisteners
$('select').off();
$('select').on('change', optionHandler);

$('.paginator').on('click', buttonHandler);

// Driver
loadData(page1Data);












