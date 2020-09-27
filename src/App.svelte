<script>
	import { onDestroy, onMount } from 'svelte';
  import { fade, slide, scale } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { tweened } from 'svelte/motion';
	import Modal from './components/Modal.svelte';
	import AppStore from './stores/AppStore';

	let showModal = true;
	const value = tweened(2, {
		duration: 5000
	});
	
	// $AppStore does all subscribing and unsubscribing.

	// Accessing store.
	// const unsub = AppStore.subscribe((data) => {
	// 	showModal = data.showModal;
	// });

	onMount(() => {
		console.log('ON MOUNT');
		// Updating
		AppStore.update((data) => ({showModal: !data.showModal}));
	});

	// onDestroy(() => {
	// 	unsub();
	// });


	let name = 'Phani';
	const people = [
		{name: 'Phani'},
		{name: 'Sai'}
		];

	// Reactive value.
	$: greeting = `Hello ${name}!`;
	$: {
		console.log(name);
	}

	const handleClick = () => {
		name = 'Phani Kumar';
	};

	const updateName = (e) => {
		name = e.target.value;
	};

	const removePerson = (i) => {
		console.log(i);
		people.splice(i, 1);
	};

	const handleModalClick = () => {
		console.log('handleModalClick');
	};

	const backDropClickyay = (a) => {
		console.log(a.detail);
	};
</script>

<Modal on:backdropClick={backDropClickyay} open={$AppStore.showModal} message="Hey how r u" on:click={handleModalClick}>
	<div slot="footer">Fit in to footer</div>
	<div>Fit in to slot</div>
</Modal>
<main>
	<h1>{greeting}</h1>
	
	<!-- <input on:input={updateName} value={name} /> -->
	<input type="text" bind:value={name} />
	<button on:click={handleClick}>Change</button>

	<ul>
		{#each people as person, i (i)}
			<li on:click={() => removePerson(i)} animate:flip={{duration: 2000}}>
				<div >{person.name}</div>	
			</li>
		{:else}
			<div>No People to show</div>
		{/each}	
	</ul>

	<div class="back" >
		<div style="width: {$value}%"></div>
	</div>
	<button on:click={() => value.set(100)}>Tween to 100 </button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.back {
		background-color: whitesmoke;
		border-radius: 4px;
		color: black;
		font-size: 12px;
		height: 16px;
		margin-bottom: 4px;
		width: 100%;
	}

	.back div {
		background-color: #2196f3;
		border-radius: 4px;
		height: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>