
//Packages required
// var express = require('express');
//  var path = require('path');
//  var app = express();
//      app.set('views', path.join(__dirname, 'views'));
//      app.set('view engine', 'pug');
//      var http = require('http').Server(app);
//     app.use(express.static(path.resolve('./public')));
const cv = require('opencv4nodejs');

const devicePort = 0;
const vCap = new cv.VideoCapture(devicePort);
var preFrame;
var frame;
var gray;
var thresh;
var preNum = 0;
const delay = 100;
let done = false;
while (!done) {
   
  if(preNum == 0){
        preFrame = vCap.read();
        preFrame = preFrame.bgrToGray();
      preNum = 10;
  } else if(preNum == 10){
    preFrame = gray.copy();
    preNum = 20;
  } 
  else{
    preFrame = gray.copy();
  }
  frame = vCap.read();
  gray = frame.bgrToGray();

  //gray = gray.gaussianBlur(new cv.Size(5, 5), 1.2);
  gray = gray.gaussianBlur(new cv.Size(1, 21), 0);
  frameDelta = gray.absdiff(preFrame);
  thresh = frameDelta.threshold( 25, 255, cv.THRESH_BINARY);
  
  if(preNum == 20){
    
    preNum = 100;
  }
  



  // loop back to start on end of stream reached
//   if (frame.empty) {
//     vCap.reset();
//     frame = vCap.read();
//   }
console.log("this is test");
 cv.imshow('a window name', thresh);
 //cv.imshow('a window name', thresh);
 //console.log(delay);
  cv.waitKey(delay);
   //done = key !== 255;
}






