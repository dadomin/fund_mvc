	<section id="profile">
		<div class="profile_size">
			
			<div class="profile_title">
				<h3>관리자</h3>
				<div class="profile_line"></div>
				<p>킥스타터에 등록된 펀드들을 관리할 수 있는 페이지입니다.</p>
			</div>

			<p>현재 회원수 : <?= $cnt ?></p>

			<?php foreach($users as $item){ ?>
				<p><?= $item->name ?> : <?= $item->money ?></p>
			<?php } ?>
			<br>
			<p>진행중인 사업</p>
			

		</div>
	</section>