/**
 * authored by leoor
 * 2016年4月
 */

var leoor = {};

leoor.getElement = function(el) {
	return document.getElementById(el) || document.getElementsByTagName(el);
}

var	loginForm = leoor.getElement('login-container'),
	form = leoor.getElement('myForm'),
	button = leoor.getElement('button')[0],	// 取得表单中button对象
	wrap = leoor.getElement('wrapper'),
	layer = leoor.getElement('layer');

var isSubmit = {
	state: ''
} 

EventUtil.addHandler(form, 'submit', formHandler);
EventUtil.addHandler(layer, 'click', wrapHandler);
EventUtil.addHandler(window, 'resize', function(event) {
	placedMiddle(layer);
});

function formHandler(event) {
	var event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	// 取得按钮
	var btn = target.elements['submit-button'];

	// 取得用户名
		user = target.elements['user'].value;
	// 禁用它
	btn.disabled = true;
	wrap.removeAttribute('class');
	btn.innerText = '登录ing...';
	// 浮出层居中显示
	placedMiddle(layer);

	var temp = user + ', Enjoy your time here';
	layer.getElementsByTagName('span')[0].innerHTML = temp;

	return EventUtil.preventDefault(event);
}

/*浮出层处理函数，确定提交表单；取消则重新加载页面*/
function wrapHandler(event) {
	var event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	isSubmit.state = target.name;
	switch(isSubmit.state) {
		case 'yes':
			form.submit();
			break;
		case 'no':
			location.reload();
			break;
	}
}


/*浮出层居中显示*/
function placedMiddle(el) {
// 取得页面视口的大小
var pageWidth = document.documentElement.clientWidth,
	pageHeight = document.documentElement.clientHeight;
// 获取元素的大小：注意，这个需要元素是可见的
	elWidth = el.offsetWidth,
	elHeight = el.offsetHeight,
	elLeft = (pageWidth - elWidth)/2,
	elTop = (pageHeight - elHeight)/2;
	el.style.left = elLeft + 'px';
	el.style.top = elTop + 'px';
}

/*单击浮出层登录框外层 取消本次登录 */
EventUtil.addHandler(wrap, 'click', function(event) {
	event = EventUtil.getEvent(event);
	var target = EventUtil.getTarget(event);
	console.log(target);
	if(target === wrap) {
		isSubmit.state = 'false';
		location.reload();
	}
})

function init() {
	button.disabled = false;
}

init();

