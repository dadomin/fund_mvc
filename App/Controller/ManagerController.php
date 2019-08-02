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
		// var_dump($list->cnt);
		// exit;

		$this->render("manager",["cnt"=>$list->cnt, "users" => $list2]);

	}
}