<template lang="html">
	<div class="container">
		<div>
			<movie-index-header></movie-index-header>
		</div>
		<div class="contentMain">
			<h1></h1>
			<div></div>
			<div class="contentText"></div>	
		</div>
		<comment></comment>
		<div>
			<common-footer></common-footer>
		</div>
	</div>
</template>

<script>
	import MovieIndexHeader from "../components/MovieIndexHeader";
	import CommonFooter from "../components/commonFooter";
	import Comment from "../components/Comment.vue";

	let article_id = 0;

	export default {
		name: "NewDetail",
		components: {
			MovieIndexHeader,
			CommonFooter,
			Comment
		}
	}
</script>

<style lang="css" scoped>
	.container {
		width: 100%;
		margin: 0 auto;
	}

	.contentMain {
		padding-top: 150px;
	}

	.contentText {
		font-size: 15px;
		padding-top: 20px;
	}
</style>
