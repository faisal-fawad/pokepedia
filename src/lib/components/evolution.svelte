<script>
    import Entry from '$lib/components/entry.svelte';
    import Title from '$lib/components/title.svelte';
    import { height, observeHeight } from '$lib/stores/height.js';
    import { onMount } from 'svelte';

    export let pokemon;
    let el;
    
    onMount(async () => {
        observeHeight(el, height);
    })
</script>

<div class="container">
    <Title text={"EVOLUTION CHAIN"} color={pokemon.color}/>
    <div class="inner-container" bind:this={el}>
        {#each pokemon.evolution as depth, i}
        {#if i > 0 && i < pokemon.evolution.length}
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"/>
            </svg>
        {/if}
        <div class="depth">
            {#each depth as poke}
                <Entry name={poke.name} id={poke.id} image={poke.image} isChain={true}/>
            {/each}
        </div>
        {/each}
    </div>
</div>

<style>
    svg {
        width: 50px;
        height: 50px;
        transition: .5s;
        fill: var(--entry-background-hover);
    }

    .inner-container, .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .depth {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-items: center;
        gap: 5px;
    }

    @media only screen and (max-width: 750px) {
        .container {
            width: 90%;
        }
    }
</style>