<?php

namespace Damin\Controller;

use Damin\DB;

class LoginController extends MasterController {

	public function login() {
		$this->render("login", []);
	}

	public function success() {
		$email = $_POST['email'];
		$password = $_POST['password'];

		$sql = "SELECT * FROM userlist WHERE email = ? AND password = PASSWORD(?)";

		$user =  DB::fetch($sql, [$email, $password]);


		if(!$user){
			DB::msgAndBack("아이디나 비밀번호가 잘못되었습니다.");
			exit;
		}


		$_SESSION['user'] = $user;

		if(isset($_SESSION['nextPage'])){
			DB::msgAndGo("로그인되었습니다.", $_SESSION['nextPage']);
			unset($_SESSION['nextPage']);
		}else {
			DB::msgAndGo("로그인되었습니다.", "/");
		}
	}

	public function logout() {
		unset($_SESSION['user']);
		DB::msgAndGo("로그아웃되었습니다.", "/");
	}

	public function profile() {
		$user = isset($_SESSION['user']) ? $_SESSION['user'] : null;
		
		if(!$user && !isset($_GET['id'])){
			DB::msgAndBack("잘못된 접근입니다.");
			exit;
		}

		$id = isset($_GET['id']) ? $_GET['id'] : "";
		
		if (isset($_GET['id']) ) {
			$sql = "SELECT userlist.* FROM userlist WHERE userlist.name = ? ";
			$user = DB::fetch($sql, [$_GET['id']]);	
		}


		$sql1 = "SELECT fundlist.* FROM fundlist WHERE fundlist.owner = ?";
		$sql2 = "SELECT fundlist.*, investor.* FROM  fundlist, investor WHERE investor.email = ? AND investor.fundnumber = fundlist.number";
		$sql3 = "SELECT fundlist.* FROM `fundlist` WHERE fundlist.owner = ? AND fundlist.current / fundlist.total = '1'";

		$list1 = DB::fetchAll($sql1, [$user->name]);
		$list2 = DB::fetchAll($sql2, [$user->email]);
		$list3 = DB::fetchAll($sql3, [$user->name]);

		$this->render("profile", ['id'=> $id, 'user' => $user, 'one' => $list1, 'two'=>$list2, 'three' => $list3]);
	}

}