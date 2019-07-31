<?php

namespace Damin\Controller;

use Damin\DB;

class ManagerController extends MasterController 
{
	public function index()
	{
		$this->render("manager",[]);
		
		$user = isset($_SESSION['user']) ? $_SESSION['user'] : null;
		
		if(!$user) {
			DB::msgAndBack("관리자 권한이 없습니다.");
			exit;
		}

		if($user->email != "admin"){
			DB::msgAndBack("관리자 권한이 없습니다.");
			exit;
		}

	}
}