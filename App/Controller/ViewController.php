<?php

namespace Damin\Controller;

use Damin\DB;

class ViewController extends MasterController {
	public function view() {
		$page = isset($_GET['start']) ? $_GET['start'] : 1;

		if(!is_numeric($page)) $page = 1;

		$sql = "SELECT COUNT(*) AS cnt FROM fundlist";
		$data = DB::fetch($sql);
		$totalCnt = $data->cnt;
		$ppn = 10;
		$totalPage = ceil($totalCnt / $ppn);
		$startPage = 1;
		$user = "";
		if(isset($_SESSION['user'])) {
			$user = $_SESSION['user'];
		}
		
		$this->render("view", ["cnt" => $data, "startPage" => $startPage, "totalPage" => $totalPage, "user" => $user]);
	}

	public function viewLoad() {
		$start = 1;
		if(isset($_GET['start'])){
			$start = $_GET['start'];
		}

		$sql = "SELECT * FROM fundlist LIMIT $start, 10";
		$list = DB::fetchAll($sql);

		echo json_encode($list, JSON_UNESCAPED_UNICODE);
	}

	public function viewLook() {

		$num = $_GET["num"];

		$sql = "SELECT `email`, `pay`, `username`, `id` FROM fundlist AS f, investor AS i WHERE f.number = i.fundnumber AND f.number = ? ";
		$list = DB::fetchAll($sql, [$num]);

		echo json_encode($list, JSON_UNESCAPED_UNICODE);

	}

	public function done() {

		$num = $_GET["num"];

		$sql = "INSERT INTO `business` (SELECT * FROM `fundlist` WHERE fundlist.number = ?)";
		$list = DB::fetch($sql, [$num]);

		
		$sql3 = "SELECT * FROM fundlist WHERE fundlist.number = ?";
		$list3 = DB::fetch($sql3, [$num]);
		$sql3 = "UPDATE `userlist` SET `money` = `money` + ? WHERE userlist.name = ?";
		$list3 = DB::fetch($sql3, [$list3->current, $list3->owner]);

		$sql2 = "DELETE FROM `fundlist` WHERE fundlist.number = ?";
		$list2 = DB::fetch($sql, [$num]);


		DB::msgAndBack("모집완료된 펀드가 사업으로 추가되었습니다.");
	}

	public function goDone() {
		$num = $_GET["num"];
		
		$sql = "SELECT investor.email, investor.pay FROM investor WHERE investor.fundnumber = ?";
		$list = DB::fetchAll($sql, [$num]);

		foreach ($list as $item) {
			$sql2 = "UPDATE `userlist` SET userlist.money = userlist.money + ? WHERE userlist.email = ?";
			$list2 = DB::query($sql2, [$item->pay,$item->email]);
		}

		$sql3 = "DELETE FROM `fundlist` WHERE fundlist.number = ?";
		$list3 = DB::fetch($sql3, [$num]);

		DB::msgAndBack("해당 펀드가 모집해제되어 해당 투자금이 반환되었습니다.");
	}

	public function funding() {
		$user = $_SESSION['user'];
		if(!$user){
			DB::msgAndBack("접근권한이 없습니다.");
		}

		$num = $_GET['num'];
		$pay = $_GET['pay'];
		
		$now = date("Y-m-d H:i:s");

		$sql2 = "SELECT * FROM investor WHERE fundnumber = ? AND email =?";
		$list2 = DB::fetch($sql2, [$num, $user->email]);

		if(!$list2){
			$sql = "INSERT INTO `investor`(`fundnumber`, `email`, `pay`, `datetime`, `username`) VALUES (?,?,?,?,?)";
			$list = DB::query($sql, [$num, $user->email, $pay, $now, $user->name]);
		}else {
			$sql3 = "UPDATE `investor` SET `pay` = `pay` + ?, `datetime` = ? WHERE `fundnumber` = ? AND `email` = ?";
			$list3 = DB::query($sql3, [$pay, $now, $num, $user->email]);
		}

		
		DB::msgAndGo("정상적으로 투자가 완료되었습니다.", "/list");

	}
}