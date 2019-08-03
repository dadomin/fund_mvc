<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no">
	<title>KICKSTARTER</title>
	<link rel="stylesheet" href="/js/style.css">
	<link rel="stylesheet" href="/fontawesome/css/all.css">
	<script src="/js/jquery-3.4.1.js"></script>
	<script src="/js/Fund.js"></script>
	<script src="/js/Investor.js"></script>
	<script src="/js/script.js"></script>
</head>
<body>
	
	<div class="toast-back"></div>
	<div class="in">
		
		<!-- 헤더 -->
		<header>
			<a href="/index">
				<img src="/images/logo.png" alt="logo">
			</a>
			<img src="/images/logo-2.png" alt="logo-2">
			<ul id="login-menu">
				<?php if(isset($_SESSION['user'])) : ?>
					<li><a href="/logout" data-target="logout">로그아웃</a></li>
				<?php else : ?>
					<li><a href="/login" data-target="login">로그인</a></li>
				<?php endif; ?>
				<li class="line"><i class="fas fa-caret-right"></i></li>
				<li><a href="/register" data-target="register">회원가입</a></li>
				<li class="line"><i class="fas fa-caret-right"></i></li>
				<li><a href="/manager" data-target="master">관리자</a></li>
			</ul>

			<?php if(isset($_SESSION['user']) && $_SESSION['user']->email == "admin") : ?>
				<p class="des">
						<a href="/manager"><?= $_SESSION['user']->name ?></a> 님, 킥스타터가 안전하게 보호되는 중입니다.
				</p>
			<?php elseif(isset($_SESSION['user'])) : ?>
				<p class="des">
						<a href="/profile"><?= $_SESSION['user']->name ?></a> 님<span>(보유금액 : <?= $_SESSION['user']->money ?>원)</span>, 킥스타터에서 펀드를 등록하고 투자해보세요.
				</p>

			<?php else : ?>
				<p class="des">
					안녕하세요, 킥스타터에 오신 것을 환영합니다.
				</p>
			<?php endif; ?>
		</header>

		<!-- 네비게이션 메뉴 -->
		<ul id="menubar">
			<li><a href="/index" data-target="index">메인페이지</a></li>
			<li><a href="/adapt" data-target="adapt">펀드등록</a></li>
			<li><a href="/view" data-target="view">펀드보기</a></li>
			<li><a href="/list" data-target="list">투자자목록</a></li>
		</ul>