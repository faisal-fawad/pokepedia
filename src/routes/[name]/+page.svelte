<script>
    import Pokemon from '$lib/components/pokemon.svelte';
    import Evolution from '$lib/components/evolution.svelte';
    import Moves from '$lib/components/moves.svelte';
    export let data;
</script>

<main class="container">
    <div class="pokemon-container">
        <Pokemon pokemon={data.pokemon}/>
    </div>
    <div class="data-container">
        <Evolution pokemon={data.pokemon}/>
        <hr/>
        <Moves pokemon={data.pokemon}/>
    </div>
</main>

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
        padding: 0 200px;
        display: flex;
        justify-content: center;
        margin-bottom: 50px;
    }

    hr {
        padding: 0;
        margin: 0;
        min-width: 100px;
        min-height: 100px;
        border: none;
    }

    @media only screen and (max-width: 1200px) {
        .data-container {
            flex-direction: column;
            align-items: center;
        }
    }

    @media only screen and (max-width: 750px) {
        .data-container {
            padding: 0;
        }
    }
</style>
