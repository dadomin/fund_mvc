
class Profile {

	constructor() {
		this.fundlist = fund_list;
		this.investlist = invest_list;
		this.businesslist = business_list;

		let fundbox = document.querySelector(".fundbox");

		for(let i = 0; i < this.fundlist.length; i++){
			let div = document.createElement("div");
			div.classList.add("profile_box");
			div.innerHTML = this.fundTemp(this.fundlist[i]);
			fundbox.append(div);
		}

		let investbox = document.querySelector(".investbox");

		for(let i = 0; i < this.investlist.length; i++){
			let div = document.createElement("div");
			div.classList.add("profile_box");
			div.innerHTML = this.fundTemp(this.investlist[i]);
			let div2 = document.createElement("div");
			div2.innerHTML = this.investTemp(this.investlist[i]);
			div.append(div2);
			investbox.append(div);
		}

		let businessbox = document.querySelector(".businessbox");
		for(let i = 0; i < this.businesslist.length; i++){
			let div = document.createElement("div");
			div.classList.add("profile_box");
			div.innerHTML = this.fundTemp(this.businesslist[i]);
			businessbox.append(div);
		}

	}

	fundTemp(x) {
		let current = parseInt(x.current).toLocaleString();
		let total = parseInt(x.total).toLocaleString();
		let sub = x.sub;
		if(sub== "" || sub === undefined) sub = "상세설명이 비워져있습니다.";
		let temp = `
			<div class="profile_box_title">
				<h3>${x.number}</h3><span>모집율 : ${x.current / x.total * 100}%</span>
			</div>
			<div class="profile_notice">
				<div class="profile_left">
					<p><span>&bull; </span>펀드이름</p>
				</div>
				<div class="profile_right">
					<p>${x.name}</p>
				</div>
			</div>
			<div class="profile_notice">
				<div class="profile_left">
					<p><span>&bull; </span>모집마감일</p>
				</div>
				<div class="profile_right">
					<p>${x.endDate}</p>
				</div>
			</div>
			<div class="profile_notice">
				<div class="profile_left">
					<p><span>&bull; </span>모집금액</p>
				</div>
				<div class="profile_right">
					<p>${total}원</p>
				</div>
			</div>
			<div class="profile_notice">
				<div class="profile_left">
					<p><span>&bull; </span>현재금액</p>
				</div>
				<div class="profile_right">
					<p>${current}원</p>
				</div>
			</div>
			<div class="profile_notice">
				<div class="profile_left">
					<p><span>&bull; </span>사업자</p>
				</div>
				<div class="profile_right">
					<p>${x.owner}</p>
				</div>
			</div>
			<div class="profile_notice">
				<div class="profile_left">
					<p><span>&bull; </span>상세설명</p>
				</div>
				<div class="profile_right">
					<p>${sub}</p>
				</div>
			</div>
		`
		return temp;
	}

	investTemp(x){
		let p = parseInt(x.pay).toLocaleString();
		let temp = `
		<div class="profile_notice">
			<div class="profile_left">
				<p><span>&bull; </span>투자금액</p>
			</div>
			<div class="profile_right">
				<p>${p}원</p>
			</div>
		</div>
		<div class="profile_notice">
			<div class="profile_left">
				<p><span>&bull; </span>투자날짜</p>
			</div>
			<div class="profile_right">
				<p>${x.datetime}</p>
			</div>
		</div>
		`
		return temp;
	}

}

window.addEventListener("load", ()=>{
	let profile = new Profile();
});