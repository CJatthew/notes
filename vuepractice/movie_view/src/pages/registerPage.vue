<template lang="html">
	<div>
		<div>
			<div>
				<div class="box">
					<label>输入用户名:</label>
					<input placeholder="用户名">
				</div>
				<div class="box">
					<label>输入密码：</label>
					<input placeholder="密码">
				</div>
				<div class="box">
					<label>重复输入密码：</label>
					<input placeholder="密码">
				</div>
				<div class="box">
					<label>输入邮箱：</label>
					<input placeholder="邮箱">
				</div>
				<div class="box">
					<label>输入手机：</label>
					<input placeholder="手机">
				</div>
				<div class="box">
					<button>注册</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style lang="css" scoped>
	.box {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 10px;
	}
</style>
