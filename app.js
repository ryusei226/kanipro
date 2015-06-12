var server = require("./server.js");
server.init();

/*
 johnny-five [ Arduino Setting ]
 */
var five = require("johnny-five");
var board = new five.Board();
var servo;

board.on("ready", function() {
    // デジタル10番ピンを設定
    servo = new five.Servo(10);
});

/*
 Socket.IO
 */
// サーバーへのアクセスを監視。アクセスがあったらコールバックが実行
server.io.sockets.on("connection", function (s) {
    var socket = s;

    // クライアントからのデータの受信
    socket.on("servo", function(dataFromClient) {
        // サーボモーターを目的の角度まで回転
        console.log(dataFromClient.angleX);
        if(servo) servo.to(Number(dataFromClient.angleX/2));
    });
    socket.on("servo_reset", function() {
        if (servo) servo.center();
    });

});