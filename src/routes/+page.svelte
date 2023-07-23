<script lang="ts">
	import Overlay from './../lib/components/Overlay.svelte';
	import { fetchAimlabProfile, getVoltaicValorantStats } from '$lib/client/gql';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let formVisible = false;
	let aimlabsUsername = '';
	let foundAimlabsUser = false;
	let profileData: AimlabProfile | null = null;
	let error = '';

	let copyIconColor = 'text-gray-500';

	async function findAimlabsUser() {
		const aimlabProfileData = await fetchAimlabProfile(aimlabsUsername);

		if (aimlabProfileData.aimlabProfile !== null) {
			profileData = aimlabProfileData;

			formVisible = false;

			setTimeout(() => {
				foundAimlabsUser = true;
			}, 255);
		} else {
			foundAimlabsUser = false;
			error = "Couldn't find an user with that username.";

			setTimeout(() => {
				error = '';
			}, 5000);
		}
	}

	onMount(async () => {
		formVisible = true;
	});
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class=" text-center flex flex-col items-center">
		<h1 class="h1 mb-6">
			<span
				class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
				>aimlabs</span
			>
			<span
				class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
				>stream</span
			>
			<span
				class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
				>overlay</span
			>
		</h1>

		{#if formVisible}
			<div transition:fade={{ delay: 50, duration: 600 }}>
				{#if error.length > 0}
					<aside class="alert variant-soft-error variant-form-material">
						<div class="alert-message">
							<h3 class="h3">Error</h3>
							<p>{error}</p>
						</div>
					</aside>
				{/if}
				<div class="flex justify-center space-x-2">
					<form
						on:submit|preventDefault={async () => {
							await findAimlabsUser();
						}}
					>
						<label class="label" for="aimlabsusername">
							<div class="relative">
								<input
									type="text"
									id="aimlabsusername"
									placeholder="aimlabs username"
									class="input btn-lg w-64 variant-form-material"
									bind:value={aimlabsUsername}
								/>
								<button class="top-0 right-0 btn btn-lg variant-form-material w-16 text-primary-50"
									>find</button
								>
							</div>
						</label>
					</form>
				</div>
			</div>
		{/if}
		{#if foundAimlabsUser}
			<div class="overflow-hidden space-y-4" transition:fly={{ y: 50, duration: 600 }}>
				<div class="flex justify-center items-center">
					<Overlay {profileData} />
				</div>

				<!-- <code>
						https://url/overlay/{aimlabsUsername}
					</code> -->
				<p>copy this url and paste it in your streaming software as a browser source</p>
				<div>
					<code
						class="text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-800 text-white rounded-lg p-4 pl-6"
					>
						<span class="flex">
							<span class="shrink-0 text-gray-500">https://</span>

							<span>aimlabs-stream-overlay.vercel.app/overlay/</span>
							<span class="text-yellow-500">{aimlabsUsername}</span>
						</span>
						<button
							on:click={() => {
								navigator.clipboard.writeText(
									`https://aimlabs-stream-overlay.vercel.app/overlay/${aimlabsUsername}`
								);

								copyIconColor = 'text-green-500';

								setTimeout(() => {
									copyIconColor = 'text-gray-500';
								}, 4000);
							}}
						>
							<svg
								class="shrink-0 h-5 w-5 transition {copyIconColor} group-hover:text-white cursor-pointer"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
								<path
									d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"
								/>
							</svg>
						</button>
					</code>
				</div>
			</div>
		{/if}
	</div>
</div>
