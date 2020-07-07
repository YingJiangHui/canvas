let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let renge = document.querySelector('#renge');
let lastPos;
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
isTouchEvent = "ontouchmove" in document.documentElement
ctx.lineWidth = renge.value;
ctx.lineCap = "round";
ctx.lineJoin = "round";
renge.oninput = function() {
    ctx.lineWidth = this.value;
}
let painting = false;
if (isTouchEvent) {
    // 移动设备
    canvas.ontouchstart = function(e) {
        lastPos = [e.touches[0].clientX, e.touches[0].clientY]
        ctx.beginPath();
        ctx.moveTo(lastPos[0], lastPos[1]);
    }
    canvas.ontouchmove = function(e) {
        ctx.lineTo(lastPos[0], lastPos[1]);
        ctx.stroke();
        lastPos = [e.touches[0].clientX, e.touches[0].clientY]
    }
} else {
    // pc设备
    canvas.onmousedown = (e) => {
        painting = true
        lastPos = [e.clientX, e.clientY]
        ctx.beginPath();

        ctx.moveTo(e.clientX, e.clientY);
    }
    canvas.onmousemove = (e) => {
        if (painting) {
            ctx.lineTo(lastPos[0], lastPos[1]);
            ctx.stroke();
            lastPos = [e.clientX, e.clientY]
        }
    }
    canvas.onmouseup = (e) => {
        ctx.closePath();
        painting = false
    }
}