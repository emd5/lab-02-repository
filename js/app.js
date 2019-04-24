'use strict';

console.log('app.js linked');

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
function loadData(){
  $.get('./data/page-1.json' , data => {
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
  $('select').append(`<option>${keyword}</option>`);
}

function filterImages(keyword){
  console.log(keyword);
  imageArray.forEach(element => {
    if(element.keyword === keyword){
      displayImages(element.image_url, element.title);
    }
  })
}


//Eventhandler function

function optionHandler(event){
  console.log(event.data);
  console.log($("option:selected").text());
}

//Eventhandler 

$('select').off();
$('select').on('change', optionHandler);
// filterImages($('option').text())



//Driver
loadData();












