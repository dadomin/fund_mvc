let start = 0;

class List {
	constructor(json){
		let app = new App();
		this.listForm = document.querySelector(".investor-form");
		this.makeInList(json);
	}

	makeInList(json){
		this.listForm.innerHTML = "";
		for(let i = 0; i < json.length; i++){
			let div = document.createElement("div");
			div.classList.add("investor");
			div.innerHTML = this.inTemp(json[i]);
			let canvas = div.querySelector("canvas");
			this.drawInGraph(canvas, json[i].pay, json[i].total);
			this.listForm.append(div);
		}
	}

	inTemp(data){
		let pay = parseInt(data.pay).toLocaleString();
		let percent = Math.floor(data.pay / data.total * 100);
		let temp = `
			<div>${data.number}</div>
			<div>${data.name}</div>
			<div><a href="/profile?id=${data.username}" style="color:#2282d1; font-style=bold;">${data.username}</a></div>
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


function getFundData(no){
	let mode = document.querySelector('#ivs').value;
	let req = new XMLHttpRequest();
	req.addEventListener("readystatechange", (e)=>{
		if(req.readyState == XMLHttpRequest.DONE){
			let json = JSON.parse(req.responseText);
			console.log(json, no, mode);
			let list = new List(json);
		}
	});
	start = no;
	req.open("GET", `/list/load?start=${no}&mode=${mode}` );
	req.send();
}

function getCount() {
	let req = new XMLHttpRequest();
	req.addEventListener("readystatechange", (e)=>{
		if(req.readyState == XMLHttpRequest.DONE) {
			let json = JSON.parse(req.responseText);
			console.log(json);
			$("#incnt").text(json.cnt);
		}
	});
	req.open("GET", "/list/load?mode=default");
	req.send();
}

window.addEventListener("load", ()=>{
	getCount();

	document.querySelector("#ivs").addEventListener("change",(e)=>{
		getFundData(0);
	});
	
	getFundData(0);
});