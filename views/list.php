		<!-- 투자자목록 -->
		<section id="fund-investor">
			<div class="size">
				<div class="investor-title">
					<h3>투자자목록</h3>
					<p><span id="incnt"></span>명의</p>
					<p>투자자분들이 있습니다.</p>
					<select name="ivs" id="ivs">
						<option value="fund" selected>펀드별</option>
						<option value="indi">개인별</option>
						<option value="recent">최근등록순</option>
					</select>
				</div>
				<div class="investor-form-title">
					<h3>펀드번호</h3>
					<h3>창업펀드명</h3>
					<h3>투자자명</h3>
					<h3>투자금액</h3>
					<h3>펀드지분</h3>
				</div>
				<div class="investor-form">
					<!-- 이곳에 펀드상품이 들어옴 -->
				</div>
			</div>

			<!-- 페이지네이션 -->
			<div class="pagenation-bar">
				<ul class="pagenation">
					<?php for($i = $startPage; $i <= $totalPage; $i++) : ?>
						<li onclick="getFundData(<?= ($i - 1) * 10 ?>)">
							<?= $i ?>
						</li>
					<?php endfor; ?>
				</ul>
			</div>
		</section>

		<script src="/js/list.js"></script>