<script lang="ts">
	import { writable } from 'svelte/store';
	import { combineLatest, timer } from 'rxjs';
	import { switchMap, scan, startWith, map } from 'rxjs/operators';
	import { toObservable } from './rxjs-interop.js';

	// Reactive state using writable stores
	const intervalStore = writable(1000);
	const pauseStore = writable(false);

	// RxJS observables
	const _interval$ = toObservable(intervalStore);
	const _pause$ = toObservable(pauseStore);
	const count$ = combineLatest([_interval$, _pause$]).pipe(
		switchMap(([interval, isPaused]) => timer(0, interval).pipe(map(() => (isPaused ? 0 : 1)))),
		scan((acc, value) => acc + value, 0),
		startWith(0)
	);

	// Event handlers
	const onIntervalChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		intervalStore.set(parseInt(target.value));
	};
	const togglePause = () => pauseStore.update((p) => !p);
</script>

<h1>Counter</h1>
<h2>Count: {$count$}</h2>
<h3>Interval: {$intervalStore} ms</h3>
<input
	type="range"
	on:input={onIntervalChange}
	min="100"
	max="1000"
	step="100"
	bind:value={$intervalStore}
/>
<button on:click={togglePause}>{$pauseStore ? 'Resume' : 'Pause'}</button>
