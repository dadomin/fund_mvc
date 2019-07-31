class App {
	constructor(result){

		this.drawing = false;
		this.drawed = false;
		this.prevX = 0;
		this.prevY = 0;
		this.signstauts = true;
		this.correctRe = false;

		this.fundList = [];
		this.highList = [];
		this.investor = [];

		// JSON 넣기
		for(let i = 0; i < result.length; i++){
			let r = result[i];
			this.fundList.push(new Fund(r.number, r.name, r.endDate, r.total, r.current, r.owner, r.investorList));
		}
		for(let i = 0; i < result.length; i++){
			let r = result[i];
			this.highList.push(new Fund(r.number, r.name, r.endDate, r.total, r.current, r.owner, r.investorList));
		}

		// 네비게이션
		this.navList  = document.querySelectorAll("#menubar > li > a");
		let now = window.location.href;
		now = now.substring(7,now.length);
		now = now.split("/")[1];
		console.log(now);
		for(let i = 0; i < this.navList.length; i++){
			this.navList[i].classList.remove("clicked");
			if(this.navList[i].dataset.target == now){
				this.navList[i].classList.add("clicked");
			}
		}
		this.navList2  = document.querySelectorAll("#login-menu > li > a");
		for(let i = 0; i < this.navList2.length; i++){
			this.navList2[i].classList.remove("clicked");
			if(this.navList2[i].dataset.target == now){
				this.navList2[i].classList.add("clicked");
			}
		}
		if(now == ""){
			document.querySelector("#menubar > li:nth-child(1) > a").classList.add("clicked");
		}
		
		let clicking = document.getElementsByClassName("clicked");
		let click = clicking[0].innerHTML;
		if(click == "메인페이지"){
			this.mainLoader();
		}
		if(click == "펀드보기"){
			this.viewLoader();
		}
		if(click == "투자자목록"){
			this.listLoader();
		}
		if(click == "펀드등록"){
			this.adaptLoader();
		}
		if(click == "회원가입"){
			this.registerLoader();
		}

		let loginbtn = document.querySelector("#login-menu > li:nth-of-type(1) > a");
		loginbtn.addEventListener("click", ()=>{
			let back = document.createElement("div");
			back.classList.add("back");
			back.innerHTML = this.loginForm();
			document.querySelector(".in").append(back);
			back.querySelector("#pop-close").addEventListener("click", ()=>{
				back.classList.add("ds");
			});
			back.querySelector(".pop").addEventListener("click", ()=>{
				back.classList.add("ds");
			});
			back.querySelector(".lookfunding").addEventListener("click", ()=>{
				let email = back.querySelector(".log-em");
				let password = back.querySelector(".log-pa");
				if(email.value == ""){
					this.toast("이메일을 입력하지 않으셨습니다.");
					email.classList.add("outline");
				}else{
					email.classList.remove("outline");
				}
				if(password.value == ""){
					this.toast("비밀번호를 입력하지 않으셨습니다.");
					password.classList.add("outline");
				}else{
					password.classList.remove("outline");
				}
			})
		});
	}


	loginForm(){
		let temp = `
			<div class="pop"></div>
			<div class="up">
				<span id="pop-close">&times;</span>
				<div class="up-in">
					<div class="in-left">
						이메일
					</div>
					<input type="text" class="log-em">
				</div>
				<div class="up-in">
					<div class="in-left">
						비밀번호
					</div>
					<input type="password" class="log-pa">
				</div>
				<div class="up-btns">
					<button class="lookfunding">로그인</button>
					<button class="lookcancle">취소</button>
				</div>
				
			</div>
		`
		return temp;
	}

	registerLoader(){
		let password = document.querySelector(".re-pa");
		password.addEventListener("focusout", ()=>{
			this.correctRe = false;
			let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]+$/;
			if(!password.value.match(regex)){
				this.toast("비밀번호는 영문, 특문(!@#$%^&*())숫자를 모두 포함해야 합니다.");
				password.classList.add("outline");
				password.value = "";
				this.correctRe = false;
			}else {
				password.classList.remove("outline");
				this.correctRe = true;
			}
		})
		let password2 = document.querySelector(".re-paa");
		password2.addEventListener("focusout", ()=>{
			this.correctRe = false;
			if(password.value != password2.value){
				this.toast("비밀번호와 비밀번호 확인란의 값이 다릅니다.");
				password.classList.add("outline");
				password2.classList.add("outline");
				password.value ="";
				password2.value ="";
				this.correctRe = false;
			}else {
				password.classList.remove("outline");
				password2.classList.remove("outline");
				this.correctRe = true;
			}
		});
		let btn = document.querySelector(".check-re");
		let email = document.querySelector(".re-em");
		let name = document.querySelector(".re-na");
		btn.addEventListener("click", ()=>{
			this.correctRe = false;

			if(email.value == ""){
				this.toast("이메일이 비워졌있습니다.");
				email.classList.add("outline");
				this.correctRe = false;
			}else {
				email.classList.remove("outline");
				this.correctRe = true;
			}
			if(name.value == ""){
				this.toast("이름이 비워졌있습니다.");
				name.classList.add("outline");
				this.correctRe = false;

			}else {
				name.classList.remove("outline");
				this.correctRe = true;
			}
			if(password.value == ""){
				this.toast("비밀번호가 비워졌있습니다.");
				password.classList.add("outline");
				this.correctRe = false;
			}else {
				password.classList.remove("outline");
				this.correctRe = true;
			}
			if(password2.value == ""){
				this.toast("비밀번호확인이 비워졌있습니다.");
				password2.classList.add("outline");
				this.correctRe = false;

			}else {
				password2.classList.remove("outline");
				this.correctRe = true;
			}

			if(this.correctRe == true) {
				
				let back = document.createElement("div");
				back.classList.add("back");
				back.innerHTML = this.loginForm();
				document.querySelector(".in").append(back);
				back.querySelector("#pop-close").addEventListener("click", ()=>{
					back.classList.add("ds");
				});
				back.querySelector(".pop").addEventListener("click", ()=>{
					back.classList.add("ds");
				});
				back.querySelector(".lookfunding").addEventListener("click", ()=>{
					let email = back.querySelector(".log-em");
					let password = back.querySelector(".log-pa");
					if(email.value == ""){
						this.toast("이메일을 입력하지 않으셨습니다.");
						email.classList.add("outline");
					}else{
						email.classList.remove("outline");
					}
					if(password.value == ""){
						this.toast("비밀번호를 입력하지 않으셨습니다.");
						password.classList.add("outline");
					}else{
						password.classList.remove("outline");
					}
				});
				
			}

		});
		
	}

	adaptLoader(){
		let cnt = this.fundList.length;
		let str = "000" + (cnt + 1);
		str = str.substring(str.length -4, str.length );
		let value = "A" + str;
		document.querySelector(".adapt-fundnumber").value = value;

		let name = document.querySelector(".adapt-fundname");
		name.addEventListener("input", ()=>{
			let regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ]+$/;
			if(!name.value.match(regex)){
				this.toast("창업펀드명은 한글, 영문, 띄어쓰기만이 가능합니다.");
				name.value = "";
				name.classList.add("outline");
			}else {
				name.classList.remove("outline");
			}
		});
		let pay = document.querySelector(".adapt-fundtotal");
		pay.addEventListener("input",()=>{
			if(pay.value < 0){
				this.toast("모집금액이 음수입니다.");
				pay.classList.add("outline");
			}else if(parseInt(pay.value) - pay.value != 0){ 
				console.log("틀려써");
				this.toast("모집금액은 자연수만 입력하실 수 있습니다.")
				pay.classList.add("outline");
			}else {
				pay.classList.remove("outline");
			}
		});
		let enddate = document.querySelector(".adapt-fundenddate");
		enddate.addEventListener("intput", ()=>{
			if(new Date(enddate.value) < new Date()){
				this.toast("모집마감일이 현재보다 전입니다.");
				enddate.classList.add("outline");
			}else {
				enddate.classList.remove("outline");
			}
		});
		enddate.addEventListener("focusout", ()=>{
			if(enddate.value == "" || enddate.value === undefined){
				this.toast("모집마감을 시,분,초를 포함하여 모두 입력해주세요");
				enddate.classList.add("outline");
			}else {
				enddate.classList.remove("outline");
			}
		});
		let text = document.querySelector(".adapt-text");
		text.addEventListener("input", ()=>{
			if(text.value.length > 500){
				this.toast("상세설명은 500자를 초과할수 없습니다.");
				text.classList.add("outline");
			}else {
				text.classList.remove("outline");
			}
		});
		let file = document.querySelector(".adapt-file");
		file.addEventListener("change", (e)=>{
			let files = file.files[0];
			let bv = 1024 * 1024;
			if(files.type.split('/')[1] != 'png' &&  files.type.split('/')[1] != 'jpg' && files.type.split('/')[1] != 'jpeg'){
				this.toast("이미지 파일은 png나 jpg만 업로드 하실 수 있습니다.");
				e.target.classList.add("outline");
				e.target.value = "";
				return;
			}else if(files.size > 5 * bv){
				this.toast("이미지는 5Mbyte이하만 가능합니다.");
				e.target.classList.add("outline");
				e.target.value = "";
				return;
			}else {
				e.target.classList.remove("outline");
			}
			console.log(files.size);

		});
		let adbtn = document.querySelector(".adapt-btn");
		adbtn.addEventListener("click", ()=>{
			if(name.value == ""){
				this.toast("창업펀드명이 비워져있습니다.")
				name.classList.add("outline");
			}else {
				name.classList.remove("outline");
			}
			if(pay.value == ""){
				this.toast("모집금액이 비워져있습니다.")
				pay.classList.add("outline");
			}else {
				pay.classList.remove("outline");
			}
			if(enddate.value == ""){
				this.toast("모집마감일이 비워져있습니다.")
				enddate.classList.add("outline");
			}else {
				enddate.classList.remove("outline");
			}
			if(text.value == ""){
				this.toast("상세설명이 비워져있습니다.")
				text.classList.add("outline");
			}else {
				text.classList.remove("outline");
			}
			if(file.value == ""){
				this.toast("펀드이미지가 비워져있습니다.")
				file.classList.add("outline");
			}else {
				file.classList.remove("outline");
			}
		})
	}

	toast(msg){
		let back = document.querySelector(".toast-back");
		let div = document.createElement("div");
		div.classList.add("toast");
		div.innerHTML = this.toastTemp(msg);
		back.prepend(div);
		setTimeout(()=>{
			div.classList.add("ds");
		}, 3000)
		let close = div.querySelector("#close");
		close.addEventListener("click", ()=>{
			div.classList.add("ds");
		});
	}
	toastTemp(msg){
		let temp = `
			<span id="close">&times</span>
			<p>${msg}</p>
		`
		return temp;
	}

	mainLoader(){
		// 펀드섹션
		this.highList = this.highList.sort((a,b) => (b.current / b.total) - (a.current / a.total));
		this.highList = this.highList.filter(x => new Date(x.endDate) > new Date());
		
		let form = document.querySelector(".fund-ranking");
		for(let i = 0; i < 4; i++){
			let div = document.createElement("div");
			div.classList.add("ranking");
			div.innerHTML = this.mainTemp(this.highList[i]);
			let canvas = div.querySelector("canvas");
			this.highList[i].drawRank(canvas, this.highList[i].current, this.highList[i].total);
			form.append(div);
			let btn = div.querySelector(".funding");
			btn.addEventListener("click", ()=>{
				let back = document.createElement("div");
				back.classList.add("back");
				back.innerHTML = this.makeRankLook(this.highList[i]);
				document.querySelector(".in").append(back);
				back.querySelector("#pop-close").addEventListener("click",()=>{
					back.classList.add("ds");
				});
				back.querySelector(".pop").addEventListener("click", ()=>{
					back.classList.add("ds");
				});
				let r = this.highList[i].investorList;
				for(let j = 0; j < r.length; j++){
					let inv = document.createElement("div");
					inv.classList.add("investor");
					inv.innerHTML = `
						<div>${r[j].email}</div>
						<div>${r[j].pay}</div>
						<div>${Math.floor(r[j].pay / this.fundList[i].total * 100)}%</div>
					`;
					back.querySelector(".in-form").append(inv);
				}
			});

		}
	}

	makeRankLook(data){
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

	mainTemp(data){ 
		let current = parseInt(data.current).toLocaleString();
		let temp = `
			<canvas width="200" height="200"></canvas>
			<h3>${data.number}</h3>
			<h3>${data.name}</h3>
			<p><span>달성율</span>${data.current / data.total * 100}%</p>
			<p><span>모집마감일</span>${data.endDate}</p>
			<p><span>현재금액</span>${current}원</p>
			<button class="funding">상세보기</button>
		`
		return temp;
	}

	viewLoader(){
		this.viewForm = document.querySelector(".view-form");
		for(let i = 0; i < this.fundList.length; i++){
			let div = document.createElement("div");
			div.classList.add("list");
			div.innerHTML = this.viewTemp(this.fundList[i]);
			let canvas = div.querySelector("canvas");
			this.drawViewGraph(canvas, this.fundList[i].current, this.fundList[i].total);

			this.viewForm.append(div);
			let status = div.querySelector(".list-status");
			let fund = div.querySelector(".gofund");
			if(new Date(this.fundList[i].endDate) < new Date){
				status.innerHTML = "모집완료";
				fund.classList.add("ds");
			}
		}
		$("#cnt").text(this.fundList.length);

		$(".golook").on("click",(e)=>{
			let pa = e.target.parentNode;
			pa = pa.parentNode;
			let cnt = $(pa).index();
			let back = document.createElement("div");
			back.classList.add("back");
			back.innerHTML = this.makeRankLook(this.fundList[cnt]);
			document.querySelector(".in").append(back);
			back.querySelector("#pop-close").addEventListener("click",()=>{
				back.classList.add("ds");
			});
			back.querySelector(".pop").addEventListener("click", ()=>{
				back.classList.add("ds");
			});
			let r = this.fundList[cnt].investorList;
			for(let j = 0; j < r.length; j++){
				let inv = document.createElement("div");
				inv.classList.add("investor");
				inv.innerHTML = `
					<div>${r[j].email}</div>
					<div>${r[j].pay}</div>
					<div>${Math.floor(r[j].pay / this.fundList[cnt].total * 100)}%</div>
				`;
				back.querySelector(".in-form").append(inv);
			}
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
			back.innerHTML = this.makeLookTemp(this.fundList[cnt]);
			document.querySelector(".in").append(back);
			console.log(back);
			back.querySelector("#pop-close").addEventListener("click",()=>{
				back.classList.add("ds");
			});
			back.querySelector(".pop").addEventListener("click", ()=>{
				back.classList.add("ds");
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
				if(e.target.value > this.fundList[cnt].total){
					console.log("초과");
					e.target.classList.add("outline");
					e.target.value = pevalue;
					this.toast("입력하신 금액이 총 모집금액을 초과하였습니다.")
					return;
				}else {
					e.target.classList.remove("outline");
				}
				pevalue = e.target.value;
			});
			back.querySelector(".lookcancle").addEventListener("click", ()=>{
				back.classList.add("ds");
			});
			back.querySelector(".lookfunding").addEventListener("click", ()=> {
				console.log("투자");
				if(this.drawed == false){
					this.toast("서명을 하지 않으셨습니다.");
					back.querySelector("canvas").classList.add("outline");
				}else {
					back.querySelector("canvas").classList.remove("outline");
				}
				let checkpay = document.querySelector(".checkpay");
				if(checkpay.value == "" || checkpay.value === undefined){
					this.toast("투자금액을 입력하지 않으셨습니다.")
					checkpay.classList.add("outline");
					return;
				}else {
					checkpay.classList.remove("outline");
				}
				if(checkpay.value < 0 || parseInt(checkpay.value) - checkpay.value != 0){
					this.toast("투자금액은 자연수만 입력하실 수 있습니다.");
					checkpay.classList.add("outline");
				}else {
					checkpay.classList.remove("outline");
				}
			});
		});
		
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

	viewTemp(data){
		let total = parseInt(data.total).toLocaleString();
		let current = parseInt(data.current).toLocaleString();

		let temp = `

				<div class="list-title">
					<h3>${data.number}</h3>
					<h3>${data.name}</h3>
					<div class="list-status">모집중</div>
				</div>
				<div class="list-views">
					<canvas width="200" height="200"></canvas>
					<div>
						<h3>모집마감일</h3>
						<div class="list-line"></div>
						<p>${data.endDate}</p>
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
						<p>${data.current / data.total * 100}%</p>
					</div>
				</div>
				<div class="list-btns">
					<button class="gofund">투자하기</button>
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
					${data.number}
				</div>
				<div class="up-in">
					<div class="in-left">창업펀드명</div>
					${data.name}
				</div>
				<div class="up-in">
					<div class="in-left">투자자명</div>
					<input type="text" disabled readonly value = "홍길동">
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
		}, 500);
		
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

	listLoader(){

		for(let i = 0; i < this.fundList.length; i++){
			let r = this.fundList[i];
			let ins = r.investorList;
			
			for(let j = 0; j < ins.length; j++){
				let suc = false;
				for(let a = 0; a < this.investor.length; a++){
					if(ins[j].email == this.investor[a].email){
						suc = true;
						this.investor[a].pay += ins[j].pay;
						if(new Date(ins[j].datetime) > new Date(this.investor[a].datetime)){
							this.investor[a].datetime = ins[j].datetime;
						}
					}
				}
				if(suc == false){
					this.investor.push(new Investor(r.number, r.name, r.total, r.current, ins[j].email, ins[j].pay, ins[j].datetime));
				}
			}
		}

		this.investor.sort((a,b) => (new Date(b.datetime)) - (new Date(a.datetime)) );
		console.log(this.investor);

		let incnt = 0;
		for(let i = 0; i < this.investor.length; i++){
			incnt++;
		}

		this.listForm = document.querySelector(".investor-form");
		// let prev = document.querySelector(".prev");
		// prev.addEventListener("click", ()=>{
		// 	this.makeInList(0,5);
		// });
		// let next = document.querySelector(".next"); 
		// next.addEventListener("click", ()=>{
		// 	this.makeInList(5, this.investor.length);
		// });
		this.makeInList(0,this.investor.length);
		$("#incnt").text(incnt);
	}

	makeInList(start, end){
		this.listForm.innerHTML = "";
		for(let i = start; i < end; i++){
			let div = document.createElement("div");
			div.classList.add("investor");
			div.innerHTML = this.inTemp(this.investor[i]);
			let canvas = div.querySelector("canvas");
			this.drawInGraph(canvas, this.investor[i].pay, this.investor[i].total);
			this.listForm.append(div);
		}
	}

	inTemp(data){
		let pay = parseInt(data.pay).toLocaleString();
		let percent = Math.floor(data.pay / data.total * 100);
		let temp = `
			<div>${data.number}</div>
			<div>${data.name}</div>
			<div>${data.email}</div>
			<div>${pay}원</div>
			<div>
				<canvas width="150" height="30"></canvas>
				<span>${percent}%</span>
			</div>
		`
		return temp;
	}

	drawInGraph(canvas, pay, total){
		let w = canvas.width;
		let h = canvas.height;
		let ctx = canvas.getContext("2d");
		let now = 0;
		let term = pay / 45;

		setTimeout(()=> {
			let frame = setInterval( ()=> {
				now += term;
				if(now >= pay){
					now = pay;
					clearInterval(term);
				}
				this.drawIn(ctx, w, h, now, total);
			}, 1000/30);
		});
		
	}

	drawIn(ctx, w, h, now, total) {
		ctx.clearRect(0,0,w,h);
		
		ctx.beginPath();
		ctx.fillStyle = "#bddff0";
		ctx.fillRect(0,0,w,h);
		ctx.closePath();

		ctx.beginPath();
		ctx.fillStyle = "#2292d1";
		ctx.fillRect(0, 0, now / total * w, h);
		ctx.closePath();
	}
}

window.onload = function(){
	$.getJSON('./js/fund.json', function(result){
		let app = new App(result);
	});
}