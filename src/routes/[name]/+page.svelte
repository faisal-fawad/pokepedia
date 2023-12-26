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
        <Evolution pokemon={data.pokemon}/>
        <hr/>
        <Moves pokemon={data.pokemon}/>
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
        box-sizing: border-box;
        width: 100%;
        padding: 0 50px;
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
    }

    hr {
        padding: 0;
        margin: 0;
        width: 100px;
        border: none;
    }
</style>
