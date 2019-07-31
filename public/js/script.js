class App {
	constructor(){

		this.drawing = false;
		this.drawed = false;
		this.prevX = 0;
		this.prevY = 0;
		this.signstauts = true;
		this.correctRe = false;

		this.fundList = [];
		this.highList = [];

		this.investor = [];
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
}
