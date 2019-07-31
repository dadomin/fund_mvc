<?php

namespace Damin\Controller;

use Damin\DB;

class ListController extends MasterController {
	public function list() {

		$page = isset($_GET['start']) ? $_GET['start'] : 1;

		if(!is_numeric($page)) $page = 1;

		$sql = "SELECT COUNT(*) AS cnt FROM investor";
		$data = DB::fetch($sql);
		$totalCnt = $data->cnt;
		$ppn = 10; //페이지당 글의 수
		$totalPage = ceil($totalCnt / $ppn);

		$d = ["startPage" => 1, "totalPage" => $totalPage];

		$this->render("list", ["startPage" => 1, "totalPage" => $totalPage]);

	}

	public function listLoad() {
		$mode = "default";
		if(isset($_GET['mode'])){
			$mode = $_GET['mode'];
		}
		$start = 1;
		if(isset($_GET['start'])){
			$start = $_GET['start'];
		}
		$sql = "";
		switch ($mode) {
			case 'default':
				$sql = "SELECT COUNT(*) AS cnt FROM investor";
				break;
			case 'recent':
				$sql = "SELECT * FROM `fundlist` AS f, `investor` AS i WHERE f.number = i.fundnumber ORDER BY i.datetime DESC LIMIT $start, 10";
				break;
			case 'indi':
				$sql = "SELECT * FROM `fundlist` AS f, `investor` AS i WHERE f.number = i.fundnumber ORDER BY i.email LIMIT $start, 10";
				break;
			case 'fund':
				$sql = "SELECT * FROM `fundlist` AS f, `investor` AS i WHERE f.number = i.fundnumber ORDER BY f.number LIMIT $start, 10";
				break;
		}
		
		if($mode == "default") {
			$res = DB::fetch($sql);
		}else{
			$res = DB::fetchAll($sql);
		}
		echo json_encode($res, JSON_UNESCAPED_UNICODE);
	}
}