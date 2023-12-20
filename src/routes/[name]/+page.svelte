<script>
    import Pokemon from '$lib/components/pokemon.svelte';
    export let data;
</script>

<div class="container">
    <div class="pokemon-container">
        <Pokemon pokemon={data.pokemon}/>
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
</style>
