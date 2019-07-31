		<!-- 회원가입 -->
		<form id="fund-register" action="/register/success" method="POST">
			<div class="register-form">
				<div class="register-title">
					<h2>회원가입</h2>
					<p>KICKSTARTER에 오신 것을 환영합니다.</p>
				</div>
				<div class="register">
					<h3>이메일</h3>
					<input type="text" name="email" placeholder="이메일을 입력해주세요." class="re-em">
				</div>
				<div class="register">
					<h3>이름</h3>
					<input type="text" name="name" placeholder="이름을 입력해주세요." class="re-na">
				</div>
				<div class="register">
					<h3>비밀번호</h3>
					<input type="password"  name="password" placeholder="비밀번호를 입력해주세요." class="re-pa">
				</div>
				<div class="register">
					<h3>비밀번호 확인</h3>
					<input type="password" name="password2" placeholder="비밀번호를 다시 입력해주세요." class="re-paa">
				</div>
				<button class="check-re" type="button">확인</button>
				<button class="sb ds" type="submit"></button>
			</div>
		</form>
		<script src="/js/register.js"></script>