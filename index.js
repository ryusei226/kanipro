var socket = io.connect(location.origin);
jQuery(document).ready(function () {
    var X = Math.floor(($(window).width() - $("#button").width()) / 2);
    var Y = Math.floor(($(window).height() - $("#button").height()) / 2);
    $("#button").css({left: X, top: Y});
    $("#leave").html('移動距離 X= 0 , Y= 0');

    $("#button").bind("touchstart", TouchStart);
    $("#button").bind("touchmove", TouchMove);
    $("#button").bind("touchend", TouchLeave);

    function TouchStart(event) {
        event.preventDefault();
        $("#event").html('タップしました');
        if (socket) {
            socket.emit("servo_reset");
        }
    }

    function TouchMove(event) {
        var pos = Position(event);
        var posx = X - (pos.x - 30);
        var posy = Y - (pos.y - 30);
        if (pos.x < X) {
            if (pos.y > Y) {
                $("#event").html('左下');
            } else {
                $("#event").html('左上');
            }
        } else {
            if (pos.y > Y) {
                $("#event").html('右下');
            } else {
                $("#event").html('右上');
            }
        }
        $("#leave").html('移動距離 X= ' + posx + ' , Y= ' + posy);
        $("#button").css({left: pos.x - 30, top: pos.y - 30});
        if (socket) {
            socket.emit("servo", {
                angleX : posx*(-1),
            });
            socket
        }
    }

    function TouchLeave(event) {
        $("#event").html('指を離しました');
        $("#button").css({left: X, top: Y});
        $("#leave").html('移動距離 X= 0 , Y= 0');
        if (socket) {
            socket.emit("servo_reset");
            socket.emit("dc_reset");
        }
    }

    function Position(e) {
        var x = e.originalEvent.touches[0].pageX;
        var y = e.originalEvent.touches[0].pageY;
        x = Math.floor(x);
        y = Math.floor(y);
        var pos = {'x': x, 'y': y};
        return pos;
    }
});
