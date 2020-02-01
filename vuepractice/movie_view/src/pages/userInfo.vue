<template lang="html">
	<div class="container">
		<div>
			<movie-index-header></movie-index-header>
		</div>
		<div class="userMessage">
			<user-message></user-message>
		</div>
		<div>
			<div class="box">用户名：</div>
			<div class="box">用户邮箱：</div>
			<div class="box">用户电话：</div>
			<div class="box">用户状态：</div>
			<div>
				<button>修改密码</button>
			</div>
		</div>
		<div>
			<div class="box">
				<label>输入旧密码：</label>
				<input placeholder="输入旧密码">
			</div>
			<div class="box">
				<label>输入新密码：</label>
				<input placeholder="输入新密码">
			</div>
			<div class="box">
				<button>修改密码</button>
			</div>
		</div>
		<div style="padding-top: 10px">
			<router-link to="/sendEmail">
				<button>发送站内信</button>
			</router-link>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import MovieIndexHeader from "../components/MovieIndexHeader";
	import CommonFooter from "../components/commonFooter";
	import UserMessage from "../components/UserMessage";

	export default {
		name: "userInfo",
		data () {
			return {}
		},
		components: {
			MovieIndexHeader,
			CommonFooter,
			UserMessage
		}
	}
</script>

<style lang="css" scoped>
	.box {
		display: inline-flex;
	}

	.container {
		width: 100%;
		margin: 0 auto;
	}

	.userMessage {
		padding-top: 60px;
		margin-top: -10px;
		margin-left: -10px;
	}
</style>
