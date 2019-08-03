	<section id="profile">
		<div class="profile_size">
			
			<div class="profile_title">
				<h3>회원현황</h3>
				<div class="profile_line"></div>
				<p>킥스타터에 등록된 회원들을 관리할 수 있는 페이지입니다.</p>
			</div>

			
			<div class="users-money">
				<div class="users-count">
					<h3>총 회원수</h3>
					<p><?= $cnt ?><span>명</span></p>
				</div>
				<div class="users">
					<h3>회원별 평균 소지금액</h3>
					<p><?= $usersmoney ?><span>원</span></p>
				</div>
			</div>

			<div class="profile_title">
				<h3>펀드현황</h3>
				<div class="profile_line"></div>
				<p>킥스타터에 등록된 펀드들을 관리할 수 있는 페이지입니다.</p>
			</div>

			<div class="fund_avg">
				<h3>펀드별 평균 달성율</h3>
				<p><span class="avg"><?= $avg ?></span> %</p>
				<canvas width="300" height="50"></canvas>
			</div>

			<div class="manage-boxes">
				<div class="manage-box">
					<h3>모집완료 펀드</h3>
					<div class="manage-line"></div>
					<p><?= $done ?><span>개</span></p>
				</div>
				<div class="manage-box">
					<h3>기한만료 펀드</h3>
					<div class="manage-line"></div>
					<p><?= $date ?><span>개</span></p>
				</div>
				<div class="manage-box">
					<h3>모집중인 펀드</h3>
					<div class="manage-line"></div>
					<p><?= $ing ?><span>개</span></p>
				</div>
			</div>

			<div class="fund_list_box">
				<?php foreach($funds as $item) { ?>
					<div class="fund_list">
						<p><?= $item->number ?></p>
						<p><?= $item->name ?></p>
						<a href="/profile?id=<?= $item->owner ?>"style="color: #2292d1; font-weight:bold" ><?= $item->owner ?></a>
						<a href="/manager/delete?num=<?= $item->number ?>" class="delete_fund">해제</a>
					</div>
				<?php } ?>
				<h3>진행사업</h3>
				<?php foreach($business as $item) { ?>
					<div class="fund_list">
						<p><?= $item->number ?></p>
						<p><?= $item->name ?></p>
						<a href="/profile?id=<?= $item->owner ?>"style="color: #2292d1; font-weight:bold" ><?= $item->owner ?></a>
						<a href="/manager/delete?num=<?= $item->number ?>" class="delete_fund">해제</a>
					</div>
				<?php } ?>
			</div>
			
			<div class="profile_title">
				<h3>진행사업현황</h3>
				<div class="profile_line"></div>
				<p>모집완료되어 진행중인 사업들을 관리할 수 있는 페이지입니다.</p>
			</div>

			<?php foreach($business as $item) { ?>
				<div class="profile_box">
					
					<div class="profile_box_title">
						<h3><?= $item->number ?></h3> <span>모집율 : <?= $item->current / $item->total * 100 ?>%</span>
					</div>
					<div class="profile_notice">
						<div class="profile_left">
							<p><span>&bull; </span>펀드이름</p>
						</div>
						<div class="profile_right">
							<p><?= $item->name ?></p>
						</div>
					</div>
					
					<div class="profile_notice">
						<div class="profile_left">
							<p><span>&bull; </span>모집마감일</p>
						</div>
						<div class="profile_right">
							<p><?= $item->endDate ?></p>
						</div>
					</div>

					<div class="profile_notice">
						<div class="profile_left">
							<p><span>&bull; </span>모집금액</p>
						</div>
						<div class="profile_right">
							<p><?= $item->total ?></p>
						</div>
					</div>

					<div class="profile_notice">
						<div class="profile_left">
							<p><span>&bull; </span>현재금액</p>
						</div>
						<div class="profile_right">
							<p><?= $item->current ?></p>
						</div>
					</div>

					<div class="profile_notice">
						<div class="profile_left">
							<p><span>&bull; </span>사업자</p>
						</div>
						<div class="profile_right">
							<p><?= $item->owner ?></p>
						</div>
					</div>

					<div class="profile_notice">
						<div class="profile_left">
							<p><span>&bull; </span>상세설명</p>
						</div>
						<div class="profile_right">
							<?php if($item->sub == "") : ?>
								<p>상세설명이 없습니다.</p>
							<?php else : ?>
								<p><?= $item->sub ?></p>
							<?php endif; ?>
						</div>
					</div>
				</div> 
			<?php } ?> 

		</div>
	</section>

	<script>
		let canvas = document.querySelector("canvas");
		let avg = document.querySelector(".avg").innerHTML;
		let w = canvas.width;
		let h = canvas.height;
		let ctx = canvas.getContext("2d");
		let now = 0;
		let term = avg / 45;

		let frame = setInterval(()=>{
			now += term;
			if(now >= avg){
				now = avg;
				clearInterval(frame);
			}
			drawGraph(ctx, w, h, now);
		}, 1000/30);

		function drawGraph(){
			ctx.clearRect(0,0,w,h);

			ctx.fillStyle = "#bddff0";
			ctx.fillRect(0,0,w,h);

			ctx.fillStyle = "#2292d1";
			ctx.fillRect(0,0, now /100 * w , h);
		}
	</script>