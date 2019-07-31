	<section id="profile">

		<div class="profile_size">

			<div class="profile_title">
				<?php if(isset($_GET['id'])) : ?>
					<h3>회원 정보</h3>
				<?php else : ?>
					<h3>내 정보</h3>
				<?php endif; ?>
				<div class="profile_line"></div>
				<p>킥스타터가 여러분의 정보를 안전하게 보호해드립니다.</p>
			</div>

			<div class="profile_box">

				<div class="profile_box_title">
					<h3>회원정보</h3>
				</div>

				<div class="profile_notice">
					<div class="profile_left">
						 <p><span>&bull; </span> 이메일</p>
					</div>
					<div class="profile_right">
						<p><?= $user->email ?></p>
					</div>
				</div>

				<div class="profile_notice">
					<div class="profile_left">
						<p><span>&bull;</span> 이름</p>
					</div>
					<div class="profile_right">
						<p><?= $user->name ?></p>
					</div>
				</div>

				<div class="profile_notice">
					<div class="profile_left">
						<p><span>&bull;</span> 보유금액</p>
					</div>
					<div class="profile_right">
						<p><?= number_format($user->money) ?>원</p>
					</div>
				</div>

			</div>
			
			<div class="fundbox">
				<div class="profile_title">
					<h3>등록한 펀드</h3>
					<div class="profile_line"></div>
					<p>회원님이 등록하신 펀드 목록입니다.</p>
				</div>
			</div>

			<div class="investbox">
				<div class="profile_title">
					<h3>투자한 펀드</h3>
					<div class="profile_line"></div>
					<p>회원님이 투자하신 펀드 목록입니다.</p>
				</div>
			</div>
			
			<div class="businessbox">
				<div class="profile_title">
					<h3>진행중인 사업</h3>
					<div class="profile_line"></div>
					<p>회원님이 등록하신 펀드 중 현재 모집이 완료되어 진행중인 사업 목록입니다.</p>
				</div>
			</div>
			

		</div>

	</section>
	<script>
		let id = "<?= $id  ?>";
		let fund_list = JSON.parse(`<?= json_encode($one) ?>`);
		console.log(fund_list);
		let invest_list = JSON.parse(`<?= json_encode($two) ?>`);
		console.log(invest_list);
		let business_list = JSON.parse(`<?= json_encode($three) ?>`);
		console.log(business_list);
	</script>
	<script src="/js/profile.js"></script>