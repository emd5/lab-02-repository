'use strict';

console.log('app.js linked');

// Global variables




// An image constructor
function Image(imageUrl, title, description, keyword, horns){
  this.imageUrl = imageUrl;
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
      displayImages(element.imageUrl, element.title)
    }))   
}


function displayImages(imageUrl, title){
  console.log(imageUrl + ' | ' + title);
  $('ul').append(`<li><img src="${imageUrl}" alt="${title}" /></li>`);
}



//Driver
console.log("image array" + imageArray);

loadData();

// displayImages(imageArray[0].imageUrl, imageArray[0].title);

// $.loadData().then(displayImages(imageArray[0].imageUrl, imageArray[0].title));








