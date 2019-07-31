<?php

namespace Damin\Controller;

use Damin\DB;

class RegisterController extends MasterController {
	public function register() {
		$this->render("register", []);
	}

	public function success() {
		echo "<prev>";
		var_dump($_POST);
		echo "</prev>";

		$email = htmlentities($_POST['email']);
		$name = htmlentities($_POST['name']);
		$password = htmlentities($_POST['password']);
		$password2 = htmlentities($_POST['password2']);

		$sql = "INSERT INTO `userlist`(`email`, `name`, `password`, `money`) VALUES (?,?,PASSWORD(?),50000)";

		$cnt = DB::query($sql, [$email, $name, $password]);

		if($cnt == 1){
			DB::msgAndGo("회원가입이 성공적으로 이루어졌습니다.", "/login");
			exit;
		}else {
			DB::msgAndBack("회원가입에 실패하였습니다.");
			exit;
		}
		
	}
}