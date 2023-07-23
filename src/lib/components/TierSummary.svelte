<script lang="ts">
	export let aimlabPlaysData: AimlabPlaysData | null = null;
	export let tier = 0;
	export let tierName = 'novice';

	import { voltaic } from '$lib/client/voltaic';

	let voltaicScenarios = Object.entries(voltaic.scenarios).map(([key, value]) => {
		return {
			name: key,
			...value
		};
	});
</script>

{#each voltaic.ranks as rank}
	{#if rank.tier === tierName}
		<div class="flex justify-between">
			<p>{rank.name}</p>
			<p>{rank.threshold}</p>
		</div>
	{/if}
{/each}

{#if aimlabPlaysData}
	{#each voltaicScenarios as scenario}
		{#if scenario.tier === tier}
			{#if aimlabPlaysData.aimlab.plays_agg.find((play) => play.group_by.task_name === scenario.name) !== undefined}
				<div class="flex justify-between">
					<p>{scenario.name}</p>
					<p>
						{aimlabPlaysData.aimlab.plays_agg.find(
							(play) => play.group_by.task_name === scenario.name
						).aggregate.max.score}
					</p>
				</div>
			{:else}
				<div class="flex justify-between">
					<p>{scenario.name}</p>
					<p>0</p>
				</div>
			{/if}
		{/if}
	{/each}
{/if}
