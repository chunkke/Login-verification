(function () {
	//取元素节点
	var rh = document.querySelector(".right");
	var input = document.querySelectorAll("input");
	var lf = document.querySelector(".left");
	var btn = document.querySelector(".btn");
	//绑定鼠标按下事件在滑块
	rh.onmousedown = function (event) {
		let [e = window.event || event, ex = e.clientX, i] = [, , 0];  
		//清除默认值
		rh.style.transition = "";
		lf.style.transition = "";
		//使按下期间input不可选
		while(i < 2) {
			input[i].readOnly = true;
			i++;
		}
		//绑定鼠标移动事件在全局
		document.onmousemove = function (event) {
			let [e = window.event || event, Ex = e.clientX] = [];
			//将按下时的鼠标X值与移动时的鼠标X值相减		
			if ((Ex - ex) <= 0) {
				//若小于0则滑块与背景为0	
				rh.style.left = "0px";
				lf.style.width = "0px";
			}
			else if ((Ex - ex) > 0 && (Ex - ex) < 241) {
				//若在框中，随鼠标移动
				rh.style.left = (Ex - ex) + "px";
				lf.style.width = (Ex - ex) + "px";
			}
			else if ((Ex - ex) >= 241) {
				//若到框底，则赋予滑块与背景最大值
				rh.style.left = "241px";
				lf.style.width = "241px";
			}
		};
		//绑定鼠标松开事件在全局
		document.onmouseup = function (event) {
			let [e = window.event || event, X = e.clientX - ex, i] = [, , 0] ;
			//清除事件以免触发
			document.onmousemove = null;
			//恢复input框
			while(i < 2) {
				input[i].readOnly = false;
				i++;
			}
			if (X > 0 && X < 241) {
				//若松开时滑块未到框底则恢复到开始的地方
				rh.style.transition = "left 1s ease";
				lf.style.transition = "width 1s ease";
				rh.style.left = "0px";
				lf.style.width = "0px";
			}
			else if (X >= 241) {
				//设置验证成功样式
				lf.innerHTML = "<p>成 功</p>";
				rh.innerHTML = "&radic;";
				lf.style.backgroundColor = "lightgreen";
				rh.onmousedown = null;
				document.onmouseup = null;
			}
		};
	};
	//按钮背景颜色转换
	btn.onmousemove = function () {
		btn.style.backgroundColor = "#5a98de";
	};
	btn.onmouseout = function () {
		btn.style.backgroundColor = "#39f";
	};
}) ();