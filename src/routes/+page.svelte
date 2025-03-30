<script lang="ts">
	import Counter from './counter.svelte';

	let counterOpened = $state(false);
</script>

{#if counterOpened}
	<Counter />
{/if}

<button onclick={() => (counterOpened = !counterOpened)}>{counterOpened ? 'hide' : 'show'}</button>
