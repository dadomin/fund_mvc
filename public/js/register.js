class Register {
	constructor() {
		let app = new App();

		this.correctRe = false;
		let password = document.querySelector(".re-pa");
		
		password.addEventListener("focusout", ()=>{
			this.correctRe = false;
			let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]+$/;
			if(!password.value.match(regex)){
				app.toast("비밀번호는 영문, 특문(!@#$%^&*())숫자를 모두 포함해야 합니다.");
				password.classList.add("outline");
				password.value = "";
				this.correctRe = false;
			}else {
				password.classList.remove("outline");
				this.correctRe = true;
			}
		});

		let password2 = document.querySelector(".re-paa");
		password2.addEventListener("focusout", ()=>{
			this.correctRe = false;
			if(password.value != password2.value){
				app.toast("비밀번호와 비밀번호 확인란의 값이 다릅니다.");
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
				app.toast("이메일이 비워졌있습니다.");
				email.classList.add("outline");
				this.correctRe = false;
			}else {
				email.classList.remove("outline");
				this.correctRe = true;
			}
			if(name.value == ""){
				app.toast("이름이 비워졌있습니다.");
				name.classList.add("outline");
				this.correctRe = false;

			}else {
				name.classList.remove("outline");
				this.correctRe = true;
			}
			if(password.value == ""){
				app.toast("비밀번호가 비워졌있습니다.");
				password.classList.add("outline");
				this.correctRe = false;
			}else {
				password.classList.remove("outline");
				this.correctRe = true;
			}
			if(password2.value == ""){
				app.toast("비밀번호확인이 비워졌있습니다.");
				password2.classList.add("outline");
				this.correctRe = false;

			}else {
				password2.classList.remove("outline");
				this.correctRe = true;
			}

			if(this.correctRe == true) {
				// alert("회원가입 완료");
				document.querySelector(".sb").click();			
				// location.href = "/login";
			}

		});

	}
}


window.addEventListener("load", () => {
	let register = new Register();
});