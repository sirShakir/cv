
//Packages required
const { imgDiff } = require('img-diff-js');

var express = require('express');
var path = require('path');
const fs = require('fs');
const pug = require('pug');
var app = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');
var http = require('http').Server(app);
app.use(express.static(path.resolve('./public')));
const cv = require('opencv4nodejs');
var io = require('socket.io')(http);//require socket.io module and pass the http object (server)


const devicePort = 0;
const vCap = new cv.VideoCapture(devicePort);
var preFrame;
var frame;
var frameX;
var gray;
var thresh;
var preNum = 0;
const delay = 100;
let done = false;

function intervalFunc() {
  
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
  
    gray = gray.gaussianBlur(new cv.Size(1, 21), 0);
    frameDelta = gray.absdiff(preFrame);
    thresh = frameDelta.threshold( 25, 255, cv.THRESH_BINARY);
    
    
  outBase64 =  cv.imencode('.jpg', thresh).toString('base64'); // Perform base64 encoding
  io.emit('sendImage', outBase64);
 
   cv.imshow('a window name', thresh);
    cv.waitKey(delay);
  }
  
   //118 - 120 is fastest thus far
  setInterval(intervalFunc,118);


// asynchronous functions
app.get('/', function(req, res, next) {
  res.render('index',  );
});



var matAsBuffer;
var lelo;
var outBase64;
 http.listen(3000, function(){
   console.log('listening on *:3000');
   //frame = cv.imread('img1.jpg');
   //matAsBuffer = frameX.getData();
   //lelo = bufferToStream(matAsBuffer);
 // outBase64 =  cv.imencode('.jpg', frame).toString('base64'); // Perform base64 encoding
   //console.log(outBase64);
 });





function bufferToStream(binary) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    }
  });

  return readableInstanceStream;

}



io.sockets.on('connection', function (socket) {// (socketIO) Connection
  console.log("connect coneccted client");

  // socket.on('newPlayer', function () {
  //   io.emit('sendImage', outBase64);
  // });


});//end of socketio for robot controls

console.log("about to begin");
var img1 = cv.imread('img1.jpg');
var img2 = cv.imread('img1.jpg');


imgDiff({
  actualFilename: 'img1.jpg',
  expectedFilename: 'img1.jpg',
  diffFilename: 'image1.jpg',
  options: {
    threshold: 1
  }
}).then(result => console.log(result));


