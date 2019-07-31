		<!-- 펀드보기 -->
		<section id="fund-view">
			<div class="size">
				<div class="view-title">
					<h3>투자상품</h3>
					<p><span id="cnt"><?= $cnt->cnt ?></span>건의</p>
					<p>투자상품이 있습니다.</p>
				</div>
				<div class="view-form">
					<!-- 이곳에 펀드상품이 들어옴 -->
				</div>
			</div>

			<!-- 페이지네이션 -->
			<div class="pagenation-bar">
				<ul class="pagenation">
					<?php for($i = $startPage; $i <= $totalPage; $i++) : ?>
						<li onclick="getData(<?= ($i - 1) * 10?>)">
							<?= $i ?>
						</li>
					<?php endfor; ?>
				</ul>
			</div>
		</section>

		<script src="/js/view.js"></script>

		<script language="javascript">

			window.addEventListener("load", async ()=>{

				await getData(0);

				<?php if(isset($_SESSION['user'])) { ?>

					let gofund = document.querySelectorAll(".list");

					for(let i = 0; i < gofund.length; i++){
						let el = gofund[i].querySelector(".gofund");
						
						if(el.dataset.type) {
							el.classList.remove("ds");
						}
					}
					
				<?php } ?>

			});

			let user = JSON.parse(`<?= json_encode($user) ?>`);
			console.log(user);
			
		</script>