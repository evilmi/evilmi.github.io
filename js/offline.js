//加载回调
var loadScript = function (url, callback) {
	var script = document.createElement('script');
	script.type = "text/javascript";
	if (script.readyState) {
		script.onreadystatechange = function () {
			if (script.readyState == "loaded" || script.readyState == "complete") {
				script.onreadystatechange = null;
				if (callback) {
					callback()
				}
			}
		}
	} else {
		script.onload = function () {
			if (callback) {
				callback()
			}
		}
	}
	script.src = url;
	document.body.appendChild(script)
};

//获取URL参数值
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

// 禁止页面拖拽，右键
function unableBrowserDefault() {
	setTimeout(function () {
		var aItems = []; //document.getElementById('vip').querySelectorAll('a');
		var imgItems = []; //document.getElementById('vip').querySelectorAll('img');
		for (var i = 0; i < aItems.length; i++) {
			aItems[i].draggable = false;
		}
		for (var i = 0; i < imgItems.length; i++) {
			imgItems[i].draggable = false;
		}
	}, 300)
	document.oncontextmenu = function (event) {
		event.returnValue = false;
	}
}

// 头部导航点击
function initTopMenu() {
	var hrefArr = [
		'https://speed.qq.com/home/loader/guanwangshouye.html',
		'https://speed.qq.com/home/loader/jiaoxueshipin.html',
		'https://speed.qq.com/home/loader/youxixiazai.html',
		'https://speed.qq.com/home/loader/wanjialuntan.html',
		'http://speed.qq.com/home/client_denglu.html',
		'https://speed.qq.com/home/loader/zaixiankefu.html',
		'https://speed.qq.com/home/loader/daojucheng.html',

	]
	var navList = document.getElementsByClassName('nav-item');
	for (var i = 0; i < navList.length; i++) {
		(function (j) {
			navList[j].addEventListener('mousedown', function () {
				// 去掉列表选中状态
				for (var k = 0; k < navList.length; k++) {
					navList[k].classList.remove('on');
					navList[k].classList.remove('move');
				}
				navList[j].classList.add("on");

			})
			navList[j].addEventListener('mouseup', function () {
				navList[j].classList.remove("on");
				window.open(hrefArr[j]);
			})


			navList[j].addEventListener('mouseover', function () {
				// 去掉列表选中状态
				for (var k = 0; k < navList.length; k++) {
					navList[k].classList.remove('on');
					navList[k].classList.remove('move');
				}
				navList[j].classList.add("move");
			})

			navList[j].addEventListener('mouseout', function () {
				// 去掉列表选中状态
				for (var k = 0; k < navList.length; k++) {
					navList[k].classList.remove('on');
					navList[k].classList.remove('move');
				}
			})
		})(i)
	}
}

//初始化广告
function loadGG(rollPic) {
	var objImg = document.getElementById("gg-box");
	var html = '';
	for (var i = 0; i < rollPic.length; i++) {
		var item = rollPic[i];
		html += '<a href="' + item.link + '" target="_blank">';
		html += '<img src="' + item.src + '" alt="' + item.title + '" title="' + item.title + '">'
		html += '</a>'
	}
	objImg.innerHTML = html;
	setTimeout(function () {
		var t = 3000, objBtn = document.getElementById("gg-num"), arrImg = objImg.getElementsByTagName('a'), length = arrImg.length, arrBtn = objBtn.getElementsByTagName('i'), intIni = 0, setInte = null;
		arrImg[0].style.display = "block";
		var setInteFun = function () {
			setInte = setInterval(funSetime = function () { intIni++; if (intIni >= length) { intIni = 0 }; funSW(intIni); }, t)
		}, iOld = 0, funSW = function (n) {
			var a = arrImg[n].firstChild, i = length;

			while (i--) {
				if (arrBtn[i].className == 'curr') { arrBtn[i].className = ''; arrImg[i].className = 'none'; break; }
			}
			arrBtn[n].className = 'curr';
			arrImg[iOld].style.display = "none";
			arrImg[n].style.display = "block";
			iOld = n
		};
		setInteFun();
		var l = length; while (l--) {
			arrBtn[l].setAttribute('id', 'b_n_' + l);
			arrBtn[l].onmouseover = function () {
				clearInterval(setInte);
				funSW(this.id.substr(4))
			};
			arrBtn[l].onclick = function () { return false }; arrBtn[l].onfocus = function () { this.blur() };
			arrBtn[l].onmouseout = function () {
				intIni = this.id.substr(4);
				setInteFun()
			}
		}
	}, 64);
}

// 资讯滚动动画
function initNews(list) {
	//拼HTML
	var html = '';
	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		html += '<div class="swiper-slide">';
		if (item.type === 'announce') {
			html += '<li class="top_news">'
		} else {
			html += '<li>';
		}
		html += '<span>[' + item.date + ']</span>';
		html += '<a target="_blank" href="' + item.typeLink + '">[' + item.typeName + ']</a>';
		html += '<a target="_blank" href="' + item.titleLink + '" class="news_text">' + item.title + '</a>';
		html += '</li></div>';
	}
	document.getElementById('sw').innerHTML = html;

	var mySwiper = new Swiper('.swiper-container', {
		autoplay: 1000,
		speed: 1000,
		autoplayDisableOnInteraction: false,
		simulateTouch: false,
		navigation: false,//不需要自动创建元素的话定义el就行
		scrollbar: false,
		createElements: true,//自动生成元素
		mode: 'vertical',
		delay: 1000,
		loop: true,
		initialSlide: 0,

	})
}


//完整初始化
function initByConfig(config) {
	var videoEle = document.getElementById('bgVideo');
	var bgImgEle = document.getElementById('bgImg');
	var { mainBG, video, image } = config;
	if (mainBG == 'video') {
		videoEle.src = video;
		videoEle.style.display = 'block';
		bgImgEle.style.display = 'none';
	} else {
		bgImgEle.src = image;
		videoEle.style.display = 'none';
		bgImgEle.style.display = 'block';
	}
}

function loadAndInit() {

	initTopMenu();
	initByConfig(GLOBAL.bg);
	// initNews(GLOBAL.newsList);
	// loadGG(GLOBAL.rollPic);
	unableBrowserDefault();
}