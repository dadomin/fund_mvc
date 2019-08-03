<?php

namespace Damin\Controller;

use Damin\DB;

class MainController extends MasterController {
	public function index() {
		$sql = "SELECT count(*) AS cnt FROM fundlist";
		$cnt = DB::fetch($sql)->cnt;

		if($cnt == 0){
			//초기에 데이터가 하나도 없는 상태
			$this->loadData();
		}
		
		$this->render("main", []);
	}

	public function mainLoad() {
		$sql = "SELECT fundlist.* FROM fundlist WHERE fundlist.endDate > now() ORDER BY fundlist.current / fundlist.total DESC LIMIT 0,4";
		$list = DB::fetchAll($sql);
		$sql2 = "SELECT fundlist.*, investor.* FROM fundlist, investor WHERE fundlist.endDate > now() AND fundlist.number = investor.fundnumber ORDER BY fundlist.current / fundlist.total DESC LIMIT 0,4";
		$list2 = DB::fetchAll($sql2);

		$json = ["fund" => $list, "investor"=> $list2];

		echo json_encode($json, JSON_UNESCAPED_UNICODE);
	}

	private function loadData(){
		$json = file_get_contents(__ROOT . "/public/js/fund.json");
		$json = json_decode($json);

		$sql = "INSERT INTO fundlist ( `number`, `name`, `endDate`, `total`, `current`) VALUES (?, ?, ?, ?, ?)";
		
		foreach($json as $fund){
			$data = [$fund->number, $fund->name, $fund->endDate, $fund->total, $fund->current];
			DB::query($sql,$data);

			$sql2 = "INSERT INTO `investor`(`fundnumber`, `email`, `pay`, `datetime`)
					 VALUES (?, ?, ?, ?)";

			$sql3 = "SELECT * FROM investor WHERE fundnumber = ? AND email =?";
			$sql4 = "UPDATE investor SET `pay` = ?, `datetime` = ? WHERE `fundnumber` = ? AND `email` =?";

			foreach($fund->investorList as $inv) {
				$value = DB::fetch($sql3, [$fund->number, $inv->email]);

				if($value){
					$value->pay += $inv->pay;
					$vdate = new \DateTime($value->datetime);
					$idate = new \DateTime($inv->datetime);
					if($vdate < $idate){
						$value->datetime = $inv->datetime;
					}
					$data3 = [$value->pay, $value->datetime, $fund->number, $inv->email];
					DB::query($sql4, $data3);
				}else {
					$data2 = [$fund->number, $inv->email, $inv->pay, $inv->datetime];
					DB::query($sql2, $data2);
				}
				
			}


		}

	}
}
