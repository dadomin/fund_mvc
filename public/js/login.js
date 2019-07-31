
class Login {
	constructor(){
		let app = new App();

		this.loginSuccess = false;

		let email = document.querySelector(".log-em");
		let password = document.querySelector(".log-pa");

		document.querySelector(".log-check").addEventListener("click", ()=> {
			if(email.value == ""){
				app.toast("이메일을 입력하지 않으셨습니다.");
				email.classList.add("outline");
				this.loginSuccess = false;
			}else {
				email.classList.remove("outline");
				this.loginSuccess = true;
			}

			if(password.value == ""){
				app.toast("비밀번호를 입력하지 않으셨습니다.");
				password.classList.add("outline");
				this.loginSuccess = false;
			}else {
				password.classList.remove("outline");
				this.loginSuccess = true;
			}

			if(this.loginSuccess == true) {
				document.querySelector(".log-sb").click();
			}
		})
	}
}

window.addEventListener("load", ()=> {
	let login = new Login();
});