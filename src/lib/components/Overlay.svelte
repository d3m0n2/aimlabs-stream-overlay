<script lang="ts">
	export let profileData: AimlabProfile | null = null;

	let rank = profileData?.aimlabProfile.ranking.rank.displayName;
	if (rank?.startsWith('Unranked')) rank = 'Unranked';

	const imgUrl = new URL(`../public/${rank?.toLowerCase().replace(/\s/g, '')}.png`, import.meta.url)
		.href;

	let width = 0;

	const romanize = (num: number) => {
		if (num === 1) return 'I';
		if (num === 2) return 'II';
		if (num === 3) return 'III';
		if (num === 4) return 'IV';
		return '';
	};

	rank = rank?.replace(/\d+/g, (match) => {
		return romanize(parseInt(match));
	});

	width = rank?.length ? rank.length * 14 + 48 : 0;

	const rankToHex = (rank: string) => {
		if (rank.toLocaleLowerCase().startsWith('bronze')) return '#CD7F32FF';
		if (rank.toLocaleLowerCase().startsWith('silver')) return '#C0C0C0FF';
		if (rank.toLocaleLowerCase().startsWith('gold')) return '#FFD700FF';
		if (rank.toLocaleLowerCase().startsWith('platinum')) return '#E5E4E2FF';
		if (rank.toLocaleLowerCase().startsWith('ruby')) return '#E0115FFF';
		if (rank.toLocaleLowerCase().startsWith('emerald')) return '#50C878FF';
		if (rank.toLocaleLowerCase().startsWith('diamond')) return '#B9F2FFFF';
		if (rank.toLocaleLowerCase().startsWith('master')) return '#36004AFF';
		if (rank.toLocaleLowerCase().startsWith('grandmaster')) return '#31499FFF';

		return '#00F1B2FF';
	};
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<svg {width} height="86" viewBox="0 0 {width} 86">
		<rect
			width={rank?.startsWith('Unranked') ? width - 40 : width}
			height="62"
			fill="rgba(0,0,0,0.5)"
		/>

		<g transform="translate(0 -751)">
			{#if rank !== undefined && !rank.startsWith('Unranked')}<rect
					width="56"
					height="56"
					transform="translate(0 754)"
					fill={rankToHex(rank || 'dupa')}
					opacity="0.25"
				/>

				<image width="40" height="40" transform="translate(8 762)" xlink:href={imgUrl} />
			{/if}

			<text
				transform="translate({rank?.startsWith('Unranked') ? 16 : 64} 777)"
				fill="rgba(255,255,255,0.75)"
				font-size="14"
				font-weight="600"
				><tspan fill="#FFFFFF" font-size="20" font-weight="700"
					><tspan x="0" y="12">{rank}</tspan></tspan
				></text
			></g
		></svg
	>
</div>
