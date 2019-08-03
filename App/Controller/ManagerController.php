<?php

namespace Damin\Controller;

use Damin\DB;

class ManagerController extends MasterController 
{
	public function index()
	{
		
		$user = isset($_SESSION['user']) ? $_SESSION['user'] : null;
		
		if(!$user) {
			DB::msgAndBack("관리자 권한이 없습니다.");
			exit;
		}

		if($user->email != "admin"){
			DB::msgAndBack("관리자 권한이 없습니다.");
			exit;
		}

		$sql = "SELECT COUNT(*) as cnt FROM userlist";
		$list = DB::fetch($sql);

		$sql2 = "SELECT * FROM userlist";
		$list2 = DB::fetchAll($sql2);

		$sql3 = "SELECT * FROM fundlist";
		$list3 = DB::fetchAll($sql3);

		// 평균 소지금액 구하기
		$money = null;
		foreach($list2 as $item){
			$money = $money + $item->money;
		}
		$usersmoney = $money / ($list->cnt);

		// 달성율 평균구하기
		$all = null;
		foreach($list3 as $item){
			$total = $item->total;
			$current = $item->current;
			$all = $all + ($current / $total * 100);
		}
		
		$avg = $all / ($list->cnt);

		// 모집완료, 기한만료, 모집중 구하기
		$done = 0;
		$date = 0;
		$ing = 0;
		foreach($list3 as $item) {
			if($item->total == $item->current){
				$done = $done +1;
			} elseif (date($item->endDate) < date("Y-m-d H:i:s")) {
				$date = $date + 1;
			} else {
				$ing = $ing + 1;
			}
		}

		$sql4 = "SELECT * FROM business";
		$list4 = DB::fetchAll($sql4);

		$this->render("manager",["cnt"=>$list->cnt, "usersmoney" => $usersmoney, "avg" => $avg, "done" => $done, "date" => $date, "ing" => $ing, "business" => $list4, "funds" => $list3]);

	}

}