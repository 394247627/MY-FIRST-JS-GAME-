function StringBuffer() {   //定义sb
    this.__strings__ = new Array;
}
StringBuffer.prototype.append = function (str) {
    this.__strings__.push(str);
};
StringBuffer.prototype.toString = function () {
    return this.__strings__.join("");
};

const arr = ["#fe0019", "#00fe24", "#002DFE", "#002DFE", "#00fe24", "#fe0019", "#FE19FD"
    , "#FE19FD", "#FEF600", "#FEF600", "#FDFCFE", "#FDFCFE", "#00F1FE", "#00F1FE", "#FE8200", "#FE8200"];    //定义方块颜色

const colorname = {
    "#fe0019": "red",
    "#00fe24": "green",
    "#002DFE": "blue",
    "#FE19FD": "pink",
    "#FEF600": "yellow",
    "#FDFCFE": "white",
    "#FE8200": "orange",
    "#00F1FE": "浅蓝色"
};

function start() {  //开始
    arr.sort(randomsort)    //打乱数组
    document.getElementById("M").innerHTML="点击draw后，有5秒记忆时间，5秒后点击相同颜色"
    document.getElementById("D").innerHTML="<button class='breathe-btn' onclick=\"drawTable(200, 4);time(5)\">draw</button>"
    document.getElementById("F").innerHTML=""
    if(localStorage.getItem("maxpoint") !== "undefined") {
        document.getElementById("MAX").innerHTML = "您的历史最高分为:" + localStorage.getItem("maxpoint") + "分！"
    }else{
        document.getElementById("MAX").innerHTML = "您的历史最高分为:0分！"
    }

}

function randomsort(a, b) { //打乱数组
    return Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}

function drawTable(edge,n,type) {   //生产颜色方块

    var size = edge / n
    var sb = new StringBuffer()
    sb.append("<center><table  border='1' height='" + edge + "' width='" + edge + "' bgcolor='red'>")
    for (var i = 0; i < n; i++) {
        sb.append("<tr>")
        for (var j = 0; j < n; j++) {
            var p = i + '' + j
            sb.append("<td width='" + size + "' height='" + size + "' ")
            if(type =="black"){
                sb.append(" bgcolor=black ")
                sb.append(" id='"+[(i*4)+j]+"' onclick='changecolor(this)'>")
            }else{
                sb.append(" bgcolor='"+arr[(i*4)+j]+"' >")
            }
            sb.append("</td>")
        }
        sb.append("</tr>")
    }
    sb.append("</table></center>")
    document.getElementById("D").innerHTML = sb.toString()
}

function time(second) {   //倒计时模块
    second = 5;                                                                                               //初始化计数器
    document.getElementById("M").innerHTML="还剩<font color=red>"+second+"</font>秒";            //在页面中显示10秒
    const tim = setInterval(function () {                                                      //定义匿名函数，
        second--;                                                                                       //函数每调用一次num减一
        document.getElementById("M").innerHTML = "还剩<font color=red>" + second + "</font>秒";       //在页面中显示减一后的秒数
        if (second == 0) {
           /* countDown()
            document.getElementById("countdown").innerHTML="    <div class=\"hold\">\n" +
                "        <div class=\"pie pie1\"></div>\n" +
                "    </div>\n" +
                "    <div class=\"hold\">\n" +
                "        <div class=\"pie pie2\"></div>\n" +
                "    </div>\n" +
                "    <div class=\"bg\"> </div>\n" +
                "    <div class=\"time\"></div>" */
            //当num变为1的时候，通过 clearInterval()结束倒计时
            document.getElementById("M").innerHTML = "请开始你的表演";
            drawTable(200, 4, "black")
            clearInterval(tim);
        }
    }, 1000);                                                                                         //每隔一秒执行一次该匿名函数
}
let point = 0
let total_point = 0
let precolor = null;
function changecolor(a) {
    const acolor = a.getAttribute("id");
    if(precolor == null) {
        precolor = arr[acolor]
    }else{
        precolor === arr[acolor]? yes():no(precolor,acolor)
        precolor = null
    }
    a.setAttribute("bgcolor",arr[acolor])

}
function yes(){ //判断正确
    precolor = null
    point ++
    total_point ++
    if(point == 8){
        document.getElementById("M").innerHTML="<button class='breathe-btn' onclick=\"start()\">再来一局</button>\n"
        document.getElementById("D").innerHTML="恭喜你全部答对!"
        document.getElementById("countdown").innerHTML=""
        point = 0
    }
    document.getElementById("F").innerHTML="得分："+total_point
}
function no(precolor,acolor) { //判断错误
    drawTable(200,4,"color")
    if (typeof(Storage) !== "undefined") {
        if(localStorage.getItem("maxpoint") !== "undefined"){
            if(localStorage.getItem("maxpoint") <= total_point){
                localStorage.setItem("maxpoint",total_point)
                document.getElementById("MAX").innerHTML="您的历史最高分为:"+localStorage.getItem("maxpoint")+"分！"
            }
        }else{
            localStorage.setItem("maxpoint",total_point)
        }
    }else {
        document.getElementById("MAX").innerHTML = "抱歉！您的浏览器不支持 Web Storage ...";
    }
    if(precolor !== "xx") {
        document.getElementById("F").innerHTML = "Wrong!正确选项为=" + colorname[precolor] + " 你选择了=" + colorname[arr[acolor]] + "<br>请再接再厉！<br>总分为：" + total_point
    }else{
        document.getElementById("F").innerHTML = "时间到！总分为：" + total_point
    }
    document.getElementById("countdown").innerHTML=""
    document.getElementById("M").innerHTML="<button class='breathe-btn' onclick=\"start()\">再来一局</button>\n"
    total_point = 0
    point = 0
}