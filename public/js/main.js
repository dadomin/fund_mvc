class Main {

	constructor(json){
		console.log(json);

		let app2 = new App();
		let fund = new Fund();

		let form = document.querySelector(".fund-ranking");

		for(let i = 0; i < json['fund'].length; i++){
			let div = document.createElement("div");
			div.classList.add("ranking");
			div.innerHTML = this.mainTemp(json['fund'][i]);
			let canvas = div.querySelector("canvas");
			fund.drawRank(canvas, json['fund'][i].current, json['fund'][i].total);
			form.append(div);
		}

		$(".funding").on("click", (e)=>{
			let cnt = $(e.target.parentNode).index();
			let back = document.createElement("div");
			back.classList.add("back");
			let fund = json.fund[cnt];
			back.innerHTML = this.makeRankLook(fund);
			document.querySelector(".in").append(back);
			this.removeBack(back);
			this.makeRankInList(back, json, fund);
		});


	}

	makeRankInList(b, json, fund) {

		json.investor.filter( x => x.number == fund.number ).forEach(item => {
			let div = document.createElement("div");
			div.classList.add("investor");
			let pay = parseInt(item.pay).toLocaleString();
			div.innerHTML = `
				<div> <a href="/profile?id=${item.username}" style="font-weight:bold; color:#2292d1;">${item.username}</a> </div>
				<div>${pay}원</div>
				<div>${item.pay / item.total * 100}%</div>
			`
			b.querySelector(".in-form").append(div);
		});
	}

	removeBack(b) {
		b.querySelector("#pop-close").addEventListener("click", ()=>{
			b.parentNode.removeChild(b);
		});
		b.querySelector(".pop").addEventListener("click",()=>{
			b.parentNode.removeChild(b);
		});
	}

	makeRankLook(data){
		let current =  parseInt(data.current).toLocaleString();
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
					${current}원
				</div>
				<div class="up-in">
					<div class="in-left">펀드등록자</div>
					<a href="/profile?id=${data.owner}" style="color:#2292d1; font-weight:bold;">${data.owner}</a>
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


}

function getData() {
	let req = new XMLHttpRequest();
	req.addEventListener("readystatechange", (e)=>{
		if(req.readyState == XMLHttpRequest.DONE){
			console.log("done");
			let json = JSON.parse(req.responseText);
			console.log(json);
			let main = new Main(json);

		}
	});
	req.open("GET", "/index/load");
	req.send();
}

window.addEventListener("load", ()=>{
	getData();
});