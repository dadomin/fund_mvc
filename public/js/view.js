let start = 0;


class View {
	constructor(list){
		let app = new App();

		this.user = user;
		console.log(user);

		this.prevX = 0;
		this.prevY = 0;
		this.drawing = false;
		this.drawed = false;
		this.signstauts = true;

		this.success = false;

		this.viewForm = document.querySelector(".view-form");

		this.viewForm.innerHTML = "";
		for(let i = 0; i < list.length; i++){
			let div = document.createElement("div");
			div.classList.add("list");
			div.innerHTML = this.viewTemp(list[i]);

			let listbox = div.querySelector(".list-btns");

			let canvas = div.querySelector("canvas");
			this.drawViewGraph(canvas, list[i].current, list[i].total);

			this.viewForm.append(div);
			let status = div.querySelector(".list-status");
			let fund = div.querySelector(".gofund");
			if(new Date(list[i].endDate) < new Date){
				status.innerHTML = "모집완료";
				fund.classList.add("ds");
			}else{
				fund.dataset.type = true;
			}
		}

		if(this.user != "") {
			console.log("잘들어 왔으");
			let listboxes = document.getElementsByClassName("list");
			console.log(listboxes);
			for(let i = 0; i < listboxes.length; i++){
				let owner = listboxes[i].querySelector(".view-owner").innerHTML;
				let percent = listboxes[i].querySelector(".view-percent").innerHTML;
				let fundnumber = listboxes[i].querySelector(".view-fundnumber").innerHTML;
				let date = listboxes[i].querySelector(".view-enddate").innerHTML;
				if(owner == this.user.name){
					listboxes[i].classList.add("owner-line");
				}
				if(owner == this.user.name && percent == 100) {
					listboxes[i].classList.remove("owner-line");
					listboxes[i].classList.add("owner-done");
					listboxes[i].querySelector(".list-status").innerHTML = "완료";
					listboxes[i].querySelector(".list-status").classList.add("list-status-done");
					listboxes[i].querySelector(".list-status").addEventListener("click", (e)=>{
						this.doneFund(e.target, fundnumber);
					});
				}
				if(owner == this.user.name && new Date(date) < new Date() && percent < 100) {
					listboxes[i].querySelector(".list-status").innerHTML = "모집해제";
					listboxes[i].querySelector(".list-status").classList.add("list-status-go-done");
					listboxes[i].querySelector(".list-status").addEventListener("click", (e)=>{
						this.goDone(e.target, fundnumber);
					})
				}
			}
		}else {
			console.log("로그아웃 상태오케이");
		}

		$(".golook").on("click",(e)=>{
			let pa = e.target.parentNode;
			pa = pa.parentNode;
			let cnt = $(pa).index();
			let ct = cnt;
			cnt = "000" + (cnt+1);
			cnt = cnt.substring(cnt.length-4, cnt.length);
			cnt = "A" + cnt;
			console.log(cnt, list[ct].total);
			let draw = new drawData(cnt, list[ct].total);

			let back = document.createElement("div");
			back.classList.add("back");
			back.innerHTML = this.makeRankLook(list[ct]);
			document.querySelector(".in").append(back);
			back.querySelector("#pop-close").addEventListener("click",()=>{
				back.parentNode.removeChild(back);
			});
			back.querySelector(".pop").addEventListener("click", ()=>{
				back.parentNode.removeChild(back);
			});
			
		});
		
		$(".gofund").on("click", (e)=>{
			this.drawed = false;
			this.signstauts = true;
			console.log("ee")
			let pa = e.target.parentNode;
			pa = pa.parentNode;
			let cnt = $(pa).index();
			console.log(cnt)
			let back = document.createElement("div");
			back.classList.add("back");
			back.innerHTML = this.makeLookTemp(list[cnt]);
			document.querySelector(".in").append(back);
			console.log(back);
			back.querySelector("#pop-close").addEventListener("click",()=>{
				back.parentNode.removeChild(back);
			});
			back.querySelector(".pop").addEventListener("click", ()=>{
				back.parentNode.removeChild(back);
			});
			let canvas = back.querySelector("canvas");
			console.log(canvas);
			canvas.addEventListener("mousedown", (e)=>{
				this.drawing = true;
				console.log("시작");
				this.prevX = e.offsetX;
				this.prevY = e.offsetY;
			});
			canvas.addEventListener("mousemove", (e)=> {
				if(this.drawing == true){
					if(this.signstauts== true){
						this.drawSign(canvas, e.offsetX, e.offsetY);
					}else if(this.signstauts == false){
						this.drawSignBold(canvas, e.offsetX, e.offsetY);
					}
					console.log("중");
					this.prevX = e.offsetX;
					this.prevY = e.offsetY;
				}
			})

			canvas.addEventListener("mouseup",()=>{
				this.drawing = false;
				console.log("끈");
			});
			back.querySelector(".status").addEventListener("click", ()=>{
				this.signstauts = true;
			});
			back.querySelector(".bold").addEventListener("click", ()=>{
				this.signstauts = false;
			});
			let pevalue = 0;
			back.querySelector(".checkpay").addEventListener("input", (e)=>{
				console.log(e.target);
				if(parseInt(e.target.value) > parseInt(list[cnt].total)){
					console.log("초과");
					e.target.classList.add("outline");
					e.target.value = pevalue;
					app.toast("입력하신 금액이 총 모집금액을 초과하였습니다.")
					this.success = false;
					return;
				}else {
					e.target.classList.remove("outline");
					this.success = true;
				}
				pevalue = e.target.value;
			});
			back.querySelector(".lookcancle").addEventListener("click", ()=>{
				back.classList.add("ds");
			});
			back.querySelector(".lookfunding").addEventListener("click", ()=> {
				console.log("투자");
				if(this.drawed == false){
					app.toast("서명을 하지 않으셨습니다.");
					back.querySelector("canvas").classList.add("outline");
					this.success = false;
				}else {
					back.querySelector("canvas").classList.remove("outline");
					this.success = true;
				}
				let checkpay = document.querySelector(".checkpay");
				if(checkpay.value == "" || checkpay.value === undefined){
					app.toast("투자금액을 입력하지 않으셨습니다.")
					checkpay.classList.add("outline");
					this.success = false;
					return;
				}else {
					checkpay.classList.remove("outline");
					this.success = true;
				}
				if(checkpay.value < 0 || parseInt(checkpay.value) - checkpay.value != 0){
					app.toast("투자금액은 자연수만 입력하실 수 있습니다.");
					checkpay.classList.add("outline");
					this.success = false;
				}else {
					checkpay.classList.remove("outline");
					this.success = true;
				}

				if(this.success == true) {
					console.log("제대로 되었도다");
					this.fundingDone(back);
				}
			});
		});
		
	}

	fundingDone(e) {
		let num = e.querySelector(".num").innerHTML;
		let pay = e.querySelector(".checkpay").value;

		location.href = "/view/funding?num=" + num + "&pay=" + pay;
	}

	goDone(x, number) {
		console.log(number);
		console.log(x.innerHTML);
		let parent = x.parentNode.parentNode;
		console.log(parent);
		// parent.parentNode.removeChild(parent);
		// $(parent).fadeOut('linear');
		location.href = "/view/godone?num=" + number;
	}

	doneFund(x, number) {
		console.log(number);
		console.log(x.innerHTML);
		let parent = x.parentNode.parentNode;
		console.log(parent);
		// parent.parentNode.removeChild(parent);
		// $(parent).fadeOut('linear');
		location.href = "/view/done?num=" + number;
	}

	makeRankLook(data){
		let sub = data.sub;
		if(sub == "" || sub === undefined) sub = "상세설명이 비워져있습니다.";
		let temp = `
			<div class="pop"></div>
			<div class="up">
				<span id="pop-close">&times;</span>
				<div class="up-in">
					<div class="in-left">펀드번호</div>
					${data.number}
				</div>				
				<div class="up-in">
					<div class="in-left">펀드이름</div>
					${data.name}
				</div>
				<div class="up-in">
					<div class="in-left">달성율</div>
					${data.current/ data.total * 100}%
				</div>
				<div class="up-in">
					<div class="in-left">모집마감일</div>
					${data.endDate}
				</div>
				<div class="up-in">
					<div class="in-left">현재금액</div>
					${data.current}
				</div>
				<div class="up-in">
					<div class="in-left">펀드등록자</div>
					<a href="/profile?id=${data.owner}" style="color: #2292d1; font-weight:bold"> ${data.owner} </a>
				</div>
				<div class="up-in">
					<div class="in-left">상세설명</div>
					<textarea readonly disabled class="up-sb">${sub}</textarea>
				</div>
				<div class="in-title">
					<h3>투자자목록</h3>
					<div class="in-line"></div>
				</div>
				<div class="in-form-title">
					<div>이름</div>
					<div>투자금액</div>
					<div>지분</div>
				</div>
				<div class="in-form">
				</div>
			</div>
		`
		return temp;
	}

	viewTemp(data){
		let total = parseInt(data.total).toLocaleString();
		let current = parseInt(data.current).toLocaleString();
		let temp = `

				<div class="list-title">
					<h3 class="view-fundnumber">${data.number}</h3>
					<h3>${data.name}</h3>
					<div class="list-status">모집중</div>
				</div>
				<div class="list-views">
					<canvas width="200" height="200"></canvas>
					<div>
						<h3>모집마감일</h3>
						<div class="list-line"></div>
						<p class="view-enddate">${data.endDate}</p>
					</div>
					<div>
						<h3>모집금액</h3>
						<div class="list-line"></div>
						<p>${total}원</p>
					</div>
					<div>
						<h3>현재금액</h3>
						<div class="list-line"></div>
						<p>${current}원</p>
					</div>
					<div>
						<h3>모집율</h3>
						<div class="list-line"></div>
						<p><span class="view-percent">${data.current / data.total * 100}</span>%</p>
					</div>
					<div>
						<h3>펀드등록자</h3>
						<div class="list-line"></div>
						<p class="view-owner">${data.owner}</p>
					</div>
				</div>
				<div class="list-btns">

						<button class="gofund ds">투자하기</button>
					<button class="golook">상세보기</button>
					
				</div>
			`

		return temp;
	}

	makeLookTemp(data){
		let temp = `
			<div class="pop"></div>
			<div class="up">
				<span id="pop-close">&times</span>
				<div class="up-in">
					<div class="in-left">펀드번호</div>
					<p class="num">${data.number}</p>
				</div>
				<div class="up-in">
					<div class="in-left">창업펀드명</div>
					<p class="name">${data.name}</p>
				</div>
				<div class="up-in">
					<div class="in-left">투자자명</div>
					<input type="text" class="invname" disabled readonly value = "${this.user.name}">
				</div>
				<div class="up-in">
					<div class="in-left">투자금액</div>
					<input type="number" class="checkpay">
				</div>
				<div class="up-sign">
					<div class="in-left">서명</div>
					<canvas width="300" height="80"></canvas>
					
					<div class="btns">
						<button class="status">얇게</button>
						<button class="bold">굵게</button>
					</div>
				</div>
				<div class="up-btns">
					<button class="lookfunding">투자</button>
					<button class="lookcancle">취소</button>
				</div>
			</div>

		`
		return temp;
	}


	drawSign(canvas, x, y){
		let w = canvas.width;
		let h = canvas.height;
		let ctx = canvas.getContext("2d");

		let px = this.prevX;
		let py = this.prevY;

		ctx.beginPath();
		ctx.strokeStyle = "#000";
		ctx.moveTo(px, py);
		ctx.lineTo(x,y);
		ctx.lineWidth= 1;
		ctx.stroke();
		ctx.closePath();
		this.drawed = true;
	}

	drawSignBold(canvas, x, y){
		let w = canvas.width;
		let h = canvas.height;
		let ctx = canvas.getContext("2d");

		let px = this.prevX;
		let py = this.prevY;

		ctx.beginPath();
		ctx.strokeStyle = "#000";
		ctx.moveTo(px, py);
		ctx.lineTo(x,y);
		ctx.lineWidth= 3;
		ctx.stroke();
		ctx.closePath();
		this.drawed = true;
	}

	drawViewGraph(canvas, current, total){
		let w = canvas.width;
		let h = canvas.height;
		let ctx = canvas.getContext("2d");
		let now = 0; 
		let term = current / 45;

		setTimeout(()=>{
			let frame = setInterval( ()=> {
				now += term;
				if(now >= current){
					now = current;
					clearInterval(frame);
				}
				this.drawV(ctx,w,h,now,total);
			}, 1000/30);
		});
		
	}

	drawV(ctx, w, h, now, total){
		ctx.clearRect(0,0,w,h);

		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.fillStyle = "#bddff0";
		ctx.arc(w/2, h/2, 90, -Math.PI*2, 3/2*Math.PI);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.fillStyle = "#2292d1";
		ctx.arc(w/2, h/2, 90, -Math.PI /2, -Math.PI/2 + (now / total) * ( 2 * Math.PI ));
		ctx.fill();
		ctx.closePath();

		ctx.beginPath();
		ctx.moveTo(w/2, h/2);
		ctx.fillStyle = "#fff";
		ctx.arc(w/2, h/2, 60, -Math.PI*2, 3/2*Math.PI);
		ctx.fill();
		ctx.closePath(); 

		let percent = Math.floor(now / total * 100);
		ctx.fillStyle = "#000";
		ctx.font = "25px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(percent+"%" , w/2, h/2);
	}
}

class ViewPop {
	constructor(list, total){

		for(let j = 0; j < list.length; j++){
			let inv = document.createElement("div");
			inv.classList.add("investor");
			inv.innerHTML = `
				<div><a href="/profile?id=${list[j].username}" style="color:#2292d1; font-weight:bold;">${list[j].username}</a></div>
				<div>${list[j].pay}</div>
				<div>${Math.floor(list[j].pay / total * 100)}%</div>
			`;
			console.log(inv);
			let container = document.querySelector("body > div.in > div > div.up > div.in-form");
			container.appendChild(inv);
			console.log(container);
			
		}
	}
}

async function getData(no) {
	return new Promise((res, rej) => {
		let req = new XMLHttpRequest();
		req.addEventListener("readystatechange", (e)=>{
			if(req.readyState == XMLHttpRequest.DONE){
				console.log("done");
				let json = JSON.parse(req.responseText);
				console.log(json);
				start += json.length;
				let view = new View(json);
				res('success');
			}
		});
		req.open("GET", "/view/load?start=" + no);
		req.send();
	});
}


function drawData(cnt, total){
	let req = new XMLHttpRequest();
	req.addEventListener("readystatechange", (e)=>{
		if(req.readyState == XMLHttpRequest.DONE){
			console.log("done");
			console.log(req.responseText);
			let json = JSON.parse(req.responseText);
			console.log(json);
			let viewPop = new ViewPop(json, total);
		}
	});
	req.open("GET", "/view/look?num=" + cnt);
	req.send();
}