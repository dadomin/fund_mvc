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
		// var_dump($user);
		// exit;
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
		// var_dump($_GET["num"]);
		// exit;
		$num = $_GET["num"];

		$sql = "SELECT `email`, `pay`, `username`, `id` FROM fundlist AS f, investor AS i WHERE f.number = i.fundnumber AND f.number = ? ";
		$list = DB::fetchAll($sql, [$num]);

		echo json_encode($list, JSON_UNESCAPED_UNICODE);

	}

	public function done() {
		error_reporting(E_ALL);
		ini_set('display_errors', 1);

		$num = $_GET["num"];

		$sql = "INSERT INTO `business` (SELECT * FROM `fundlist` WHERE fundlist.number = ?)";
		$list = DB::fetch($sql, [$num]);

		// $sql2 = "DELETE FROM `fundlist` WHERE fundlist.number = ?";
		// $list2 = DB::fetch($sql, [$num]);

		// $sql3 = "SELECT * FROM fundlist WHERE fundlist.number = ?";
		// $list3 = DB::fetch($sql3, [$num]);
		// $sql3 = "UPDATE `userlist` SET `money` = `money` + ? WHERE userlist.name = ?";
		// $list3 = DB::fetch($sql3, [$list3->current, $list3->owner]);

		DB::msgAndBack("모집완료된 펀드가 사업으로 추가되었습니다.");
	}
}