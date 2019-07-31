class Adapt {
	constructor(json){
		this.adaptSuc = false;

		let app2 = new App();

		let cnt = parseInt(json.cnt);
		let str = "000" + (cnt + 1);
		str = str.substring(str.length -4, str.length );
		let value = "A" + str;
		document.querySelector(".adapt-fundnumber").value = value;

		let name = document.querySelector(".adapt-fundname");
		name.addEventListener("input", ()=>{
			let regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z ]+$/;
			if(!name.value.match(regex)){
				app2.toast("창업펀드명은 한글, 영문, 띄어쓰기만이 가능합니다.");
				name.value = "";
				name.classList.add("outline");
				this.adaptSuc = false;
			}else {
				name.classList.remove("outline");
				this.adaptSuc = true;
			}
		});
		let pay = document.querySelector(".adapt-fundtotal");
		pay.addEventListener("input",()=>{
			if(pay.value < 0){
				app2.toast("모집금액이 음수입니다.");
				pay.classList.add("outline");
				this.adaptSuc = false;
			}else if(parseInt(pay.value) - pay.value != 0){ 
				console.log("틀려써");
				app2.toast("모집금액은 자연수만 입력하실 수 있습니다.")
				pay.classList.add("outline");
				this.adaptSuc = false;
			}else {
				pay.classList.remove("outline");
				this.adaptSuc = true;
			}
		});
		let enddate = document.querySelector(".adapt-fundenddate");
		enddate.addEventListener("input", ()=>{
			if(new Date(enddate.value) < new Date()){
				app2.toast("모집마감일이 현재보다 전입니다.");
				enddate.classList.add("outline");
				this.adaptSuc = false;
			}else {
				enddate.classList.remove("outline");
				this.adaptSuc = true;
			}
		});
		enddate.addEventListener("focusout", ()=>{
			if(enddate.value == "" || enddate.value === undefined){
				app2.toast("모집마감을 시,분,초를 포함하여 모두 입력해주세요");
				enddate.classList.add("outline");
				this.adaptSuc = false;
			}else {
				enddate.classList.remove("outline");
				this.adaptSuc = true;
			}
			if(new Date(enddate.value) < new Date()){
				app2.toast("모집마감일이 현재보다 전입니다.");
				enddate.classList.add("outline");
				enddate.value = "";
				this.adaptSuc = false;
			}else {
				enddate.classList.remove("outline");
				this.adaptSuc = true;
			}
		});
		let text = document.querySelector(".adapt-text");
		text.addEventListener("input", ()=>{
			if(text.value.length > 500){
				app2.toast("상세설명은 500자를 초과할수 없습니다.");
				text.classList.add("outline");
				this.adaptSuc = false;
			}else {
				text.classList.remove("outline");
				this.adaptSuc = true;
			}
		});
		let file = document.querySelector(".adapt-file");
		file.addEventListener("change", (e)=>{
			let files = file.files[0];
			let bv = 1024 * 1024;
			if(files.type.split('/')[1] != 'png' &&  files.type.split('/')[1] != 'jpg' && files.type.split('/')[1] != 'jpeg'){
				app2.toast("이미지 파일은 png나 jpg만 업로드 하실 수 있습니다.");
				e.target.classList.add("outline");
				e.target.value = "";
				this.adaptSuc = false;
				return;
			}else if(files.size > 5 * bv){
				app2.toast("이미지는 5Mbyte이하만 가능합니다.");
				e.target.classList.add("outline");
				e.target.value = "";
				this.adaptSuc = false;
				return;
			}else {
				e.target.classList.remove("outline");
				this.adaptSuc = true;
			}
			console.log(files.size);

		});
		let adbtn = document.querySelector(".adapt-btn");
		adbtn.addEventListener("click", ()=>{
			if(name.value == ""){
				app2.toast("창업펀드명이 비워져있습니다.")
				name.classList.add("outline");
				this.adaptSuc = false;
			}else {
				name.classList.remove("outline");
				this.adaptSuc = true;
			}
			if(pay.value == ""){
				app2.toast("모집금액이 비워져있습니다.")
				pay.classList.add("outline");
				this.adaptSuc = false;
			}else {
				pay.classList.remove("outline");
				this.adaptSuc = true;
			}
			if(enddate.value == ""){
				app2.toast("모집마감일이 비워져있습니다.")
				enddate.classList.add("outline");
				this.adaptSuc = false;
			}else {
				enddate.classList.remove("outline");
				this.adaptSuc = true;
			}
			if(text.value == ""){
				app2.toast("상세설명이 비워져있습니다.")
				text.classList.add("outline");
				this.adaptSuc = false;
			}else {
				text.classList.remove("outline");
				this.adaptSuc = true;
			}
			if(file.value == ""){
				app2.toast("펀드이미지가 비워져있습니다.")
				file.classList.add("outline");
				this.adaptSuc = false;
			}else {
				file.classList.remove("outline");
				this.adaptSuc = true;
			}

			if(this.adaptSuc == true){
				app2.toast("펀드등록 성공");
				document.querySelector(".ad-sb").click();
			}
		});



	}

}

function getData() {
	let req = new XMLHttpRequest();
	req.addEventListener("readystatechange", (e)=>{
		if(req.readyState == XMLHttpRequest.DONE){
			console.log("done");
			console.log(req.responseText);
			let json = JSON.parse(req.responseText);
			console.log(json);
			let adapt = new Adapt(json);
		}
	});
	req.open("GET", "/adapt/load");
	req.send();
}

window.addEventListener("load", ()=>{
	getData();
});