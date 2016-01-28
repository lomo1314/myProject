/*input 点击文本框 */
var searchText = document.getElementById("searchText");
var textList = document.getElementById("textList");
var inputWords = document.getElementById("inputWords");
var searchBtn = document.getElementById("searchBtn");

searchText.onfocus = searchText.onclick = searchText.onkeyup = function () {
    var val = this.value.replace(/(^ +| +$)/g, "");
    textList.style.display = val.length >= 0 ? "block" : "none";
    searchText.style.borderColor = "#ff6603";
    searchBtn.style.borderColor = "#ff6603";

};

searchBtn.onmouseover = searchText.onmouseover = function () {
    searchBtn.style.borderColor = "#616161";
    searchText.style.borderColor = "#616161";
};

searchBtn.onmouseout = searchText.onmouseout = function () {
    searchBtn.style.borderColor = "#dcdcdc";
    searchText.style.borderColor = "#dcdcdc";
};

document.body.onclick = function (e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    if (tar.id === "searchText") {
        inputWords.style.display = "none";
        return;
    }
    if (tar.tagName.toLowerCase() === "a" && tar.parentNode.parentNode.id === "textList") {
        textList.style.display = "none";
        searchText.value = tar.innerHTML;
        return;
    }
    textList.style.display = "none";
    inputWords.style.display = "block";
    searchText.style.borderColor = "#dcdcdc";
    searchBtn.style.borderColor = "#dcdcdc";
};

/*购物车滑动效果*/
$(document).ready(function () {
    $("#ag").mouseenter(function () {
        $(".topMenuDis").slideDown(500);
    });
    $("#ag").mouseleave(function () {
        $(".topMenuDis").slideUp(500);
    })
});

/* 菜单栏，选项卡。 隐藏手机信息 */
var menuList = document.getElementById("menuList");
var oList = menuList.getElementsByTagName("li");


for (var i = 0; i < oList.length - 2; i++) {
    var oLi = oList[i];
    var oDiv = oLi.getElementsByTagName("div")[0];

    oLi.index = i;
    oLi.inner = oDiv;
    oLi.onmousemove = function () {
        this.inner.style.display = "block";

    }
    oLi.onmouseout = function () {
        this.inner.style.display = "none";
    }
}
/*banner 轮播图*/
var dataAry = ["img/banner1.jpg", "img/banner2.jpg", "img/banner3.jpg", "img/banner4.jpg", "img/banner5.jpg"];
var outer = document.getElementById("nva");
var inner = document.getElementById("inner");
var imgList = inner.getElementsByTagName("div");
var tip = document.getElementById("tip");
var tipList = tip.getElementsByTagName("li");


function bindData() {
    var str = "";
    for (var i = 0; i < dataAry.length; i++) {
        str += "<div trueImg='" + dataAry[i] + "'></div>";
    }
    str += "<div trueImg='" + dataAry[0] + "'></div>";
    inner.innerHTML = str;

    str = "";
    for (i = 0; i < dataAry.length; i++) {
        var temp = i === 0 ? "select" : null;
        str += "<li class='" + temp + "'></li>"
    }
    tip.innerHTML = str;
    inner.style.width = (dataAry.length + 1) * 1230 + "px";
    tip.style.width = dataAry * 15 + "px";
}
bindData();

function imgTd() {
    for (var i = 0; i < imgList.length; i++) {
        ~function (i) {
            var curImg = imgList[i];
            var oImg = new Image;
            oImg.src = curImg.getAttribute("trueImg");
            oImg.onload = function () {
                curImg.appendChild(oImg);
            }
        }(i)
    }
}

imgTd();
var step = 0;
function move() {
    step++;
    if (step > dataAry.length) {
        inner.style.left = 0 + "px";
        step = 1;
    }
    animate(inner, {left: step * -1230}, 500);
    changeTip();
}
var imgTimer = window.setInterval(move, 4000);

function changeTip() {
    var tempTip = step >= tipList.length ? 0 : step;
    for (var i = 0; i < tipList.length; i++) {
        tipList[i].className = i === tempTip ? "select" : null;
    }
}
for (var i = 0; i < tipList.length; i++) {
    tipList[i].index = i;
    tipList[i].onclick = function () {
        window.clearInterval(imgTimer);
        animate(inner, {left: this.index * -1230}, 500);
        step = this.index;
        imgTimer = window.setInterval(move, 4000);
        changeTip();
    }
}
outer.onmousemove = function () {
    aLeft.style.display = aRight.style.display = "block";
};
outer.onmouseleave = function () {
    aLeft.style.display = aRight.style.display = "none";
};

aLeft.onclick = function () {
    window.clearInterval(imgTimer);
    step--;
    if (step <= -1) {
        inner.style.left = -6150 + "px";
        step = 4;
    }
    animate(inner, {left: step * -1230}, 500);
    imgTimer = window.setInterval(move, 4000);
    changeTip();
};
aRight.onclick = function () {
    window.clearInterval(imgTimer);
    step++;
    if (step >= imgList.length) {
        inner.style.left = 0 + "px";
        step = 1;
    }
    animate(inner, {left: step * -1230}, 500);
    imgTimer = window.setInterval(move, 4000);
    changeTip();
};

/*banner 上选择框*/

var oUl = document.getElementById("oUl");
var oLis = oUl.getElementsByTagName("li");
for (var i = 0; i < oLis.length; i++) {
    var oTim = oLis[i];
    var oTl = oTim.getElementsByTagName("div")[0];
    oTl.style.top = -(i * 42 + 20) + "px";

    oTim.cat = i;
    oTim.box = oTl;
    oTim.onmouseover = function () {
        this.box.style.display = "block";
        this.className = "change";
    };
    oTim.onmouseout = function () {
        this.box.style.display = "none";
        this.className = "";
    };
}