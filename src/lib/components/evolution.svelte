<script>
    import Entry from "$lib/components/entry.svelte";
    export let evolution;
</script>

<div class="container">
    {#each evolution as depth}
    <div class="depth">
        {#each depth as pokemon}
            <Entry name={pokemon.name} id={pokemon.id} image={pokemon.image}/>
        {/each}
    </div>
    {/each}
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>