<template lang="css">
	<div class="container">
		<div>
			<movie-index-header></movie-index-header>
		</div>
		<div class="contentMain">
			<div>
				<div class="contentLeft">
					<ul class="cont-ul">
						<movies-list></movies-list>
					</ul>
				</div>
			</div>
		</div>
		<common-footer></common-footer>
	</div>
</template>

<script>
	import MovieIndexHeader form "../components/MovieIndexHeader";
	import CommonFooter from "../components/commonFooter";
	import MoviesList from "../components/MoviesList";

	export default {
		components: {
			MovieIndexHeader,
			CommonFooter,
			MoviesList
		},
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
		padding-top: 20px
	}
</style>
