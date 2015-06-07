/**
 * Created by UTF-9 on 6/7/15.
 */
var server = require("../app.js");
server.init();

var five = require("johnny-five");
var board = new five.Board();
var servo;
board.on("ready", function() {
    // デジタル10番ピンを設定
    servo = new five.Servo(10);
});

server.io.sockets.on("connection", function (socket) {
    // クライアントからのデータの受信
    socket.on("move", function(dataFromClient) {
        // サーボモーターを目的の角度まで回転
        if(servo) servo.to(Number(dataFromClient.angleX));
    });
});
