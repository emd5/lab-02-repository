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
    }))
}

function displayImages(image_url, title){
  console.log(image_url + ' | ' + title);
  $('ul').append(`<li><img src="${image_url}" alt="${title}" /></li>`);
}




//Driver
loadData();









