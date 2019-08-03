<?php

namespace Damin\Controller;

use Damin\DB;

class AdaptController extends MasterController {

	public function adapt() {
		$this->render("adapt", []);

		if(!isset($_SESSION['user'])) {
			DB::msgAndBack("로그인한 회원만 펀드등록을 하실수 있습니다.");
		}
	}

	public function adaptLoad(){
		$sql = "SELECT COUNT(*) as cnt FROM `fundlist`";
		$list = DB::fetch($sql);

		echo json_encode($list, JSON_UNESCAPED_UNICODE);
	}

	public function success() {
		$number = $_POST['fundnumber'];
		$name = $_POST['fundname'];
		$enddate = $_POST['enddate'];
		$total = $_POST['total'];
		$sub = $_POST['sub'];
		$user = $_SESSION['user'];
		
		$sql = "INSERT INTO `fundlist`(`number`, `name`, `endDate`, `total`, `current`, `owner`, `sub`) VALUES (?,?,?,?,?,?,?)";
		$list = DB::query($sql, [$number, $name, $enddate, $total, 0, $user->name, $sub]);

		if(!$list){
			DB::msgAndBack("등록실패");
			exit;
		}

		DB::msgAndGo("펀드등록 성공", "/");
	}
}

