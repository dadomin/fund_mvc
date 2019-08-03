		<!-- 펀드등록 -->
		<form action="/adapt/success" method="POST" id="fund-adapt">
			<div class="adapt-form">
				<div class="adapt-title">
					<h2>펀드등록하기</h2>
				</div>
				<div class="adapt">
					<h3>펀드번호</h3>
					<input type="text" readonly class="adapt-fundnumber" name="fundnumber">
				</div>
				<div class="adapt">
					<h3>창업펀드명</h3>
					<input type="text" placeholder="창업펀드명을 입력해주세요." class="adapt-fundname" name="fundname">
				</div>
				<div class="adapt adapt-enddate">
					<h3>모집마감일</h3>
					<input type="datetime-local" step="1" class="adapt-fundenddate" name="enddate">
				</div>
				<div class="adapt">
					<h3>모집금액</h3>
					<input type="number" placeholder="모집금액을 입력해주세요." class="adapt-fundtotal" name="total">
				</div>
				<div class="adapt">
					<h3>상세설명</h3>
					<textarea class="adapt-text"cols="30" rows="10" placeholder="500자 이내로 입력하세요." name="sub"></textarea>
				</div>
				<div class="adapt">
					<h3>펀드이미지</h3>
					<input type="file" class="adapt-file">
				</div>
				<button type="button" class="adapt-btn">펀드등록하기</button>
				<button type="submit" class="ad-sb ds"></button>
			</div>
		</form action="/adapt/success" method="POST">

		<script src="/js/adapt.js"></script>