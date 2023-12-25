<script>
    import Pokemon from '$lib/components/pokemon.svelte';
    import Evolution from '$lib/components/evolution.svelte';
    import Moves from '$lib/components/moves.svelte';
    export let data;

    /* We can get the height of evolution by examining the depth
    Which we can then use to align the moves height with the evolution tree height */
</script>

<div class="container">
    <div class="pokemon-container">
        <Pokemon pokemon={data.pokemon}/>
    </div>
    <div class="data-container">
        <Evolution data={data.pokemon}/>
        <Moves data={data.pokemon}/>
    </div>
</div>

<style>
    .container {
        width: 100%;
    }

    .pokemon-container {
        width: 100%;
        height: auto;
        padding: 100px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .data-container {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
</style>
