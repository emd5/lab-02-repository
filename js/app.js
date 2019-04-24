'use strict';

console.log('app.js linked');

// Global variables
const imageArray = [];

// This loads the image data
function loadData(){
  $.get('./data/page-1.json' , data => {
    data.forEach( (element) => {
      new Image(element.image_url, element.title, element.description, element.keyword, element.horns);
    });
  });
}

// An image constructor
function Image(imageUrl, title, description, keyword, horns){
  this.imageUrl = imageUrl;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  imageArray.push(this);

}




//Driver
loadData();





