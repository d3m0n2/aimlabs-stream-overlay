<script lang="ts">
	export let profileData: AimlabProfile | null = null;
</script>

<div class="card card-hover overflow-hidden variant-form-material p-6">
	<header>
		<h5 class="h5">{profileData?.aimlabProfile.username}</h5>
	</header>

	<div class="p-2">
		<h3 class="h3">{profileData?.aimlabProfile.ranking.rank.displayName.replace(/\d+/g, '')}</h3>
	</div>

	<hr class="opacity-50" />
</div>
