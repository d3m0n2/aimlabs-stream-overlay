<script lang="ts">
	import { page } from '$app/stores';
	import { fetchAimlabProfile } from '$lib/client/gql';
	import Overlay from '$lib/components/Overlay.svelte';
	import { onMount } from 'svelte';
	const username = $page.params.username;

	let profileData: AimlabProfile | null = null;

	onMount(async () => {
		document.body.style.backgroundColor = 'transparent';
		if (!username) return;

		console.log('fetching profile data');

		profileData = await fetchAimlabProfile(username);

		if (profileData.aimlabProfile === null) {
			console.log('nothing found');

			profileData = null;
		}

		const refreshInterval = setInterval(async () => {
			if (profileData === null) return;
			profileData = await fetchAimlabProfile(username);
		}, 60000);
	});
</script>

{#if username === undefined}
	Nothing found
{:else if profileData === null}
	Loading...
{:else}
	<Overlay {profileData} />
{/if}

<style>
</style>
