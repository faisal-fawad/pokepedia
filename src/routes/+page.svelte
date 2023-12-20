<script>
    import { createSearchStore, searchHandler } from '$lib/stores/search'
    import Loading from '$lib/components/loading.svelte';
    import { onDestroy, onMount } from 'svelte';
    import Entry from '$lib/components/entry.svelte';

    // Variables used for rendering batches of pokemon
    const defaultBatch = 100;
    let upper = defaultBatch;
    let end = null;
    let infinite, loading = false;
    let observer = null;

    let data = [];
    const store = createSearchStore(data);
    const unsubscribe = store.subscribe(model => {
        searchHandler(model);
        upper = defaultBatch; // Set upper to default value
        infinite = false;
        observer?.unobserve(end); // Attempt to unobserve
    });

    onMount(async () => {
        loading = true;
        const res = await fetch('api/pokemon');
        data = await res.json();
        store.set({
            data: data,
            filtered: data,
            search: $store.search
        });
        observer = new IntersectionObserver((e) => {
            if (e[0].isIntersecting) update();
        }); 
        loading = false;
    });

    onDestroy(async () => {
        unsubscribe();
    })

    function update() {
        if (!end || !observer) return; // Null binding

        if (upper < $store.filtered.length) upper += defaultBatch;
        else observer.unobserve(end); // End of data has been reached

        if (!infinite) {
            observer.observe(end); // Start of data has been invoked
            infinite = true;
        }
    }
</script>

<!-- Add HTML game above the pokedex -->
<div class="pokedex">
    <hr/>
    <input class="search" placeholder="Search..." bind:value={$store.search}/>
    <hr/>
    <div class="entries">
        {#if loading}
            <Loading size=60/>
        {:else}
            {#each $store.filtered.slice(0, upper) as pokemon}
                <Entry name={pokemon.name} id={pokemon.id} image={pokemon.image}/>
            {/each}
        {/if}
    </div>
    <hr bind:this={end}/>
    {#if upper < $store.filtered.length}
        <button class="load" on:click={update}>Load more pokémon...</button>
        <hr/>
    {/if}
</div>

<style>
    hr {
        background: transparent;
        border: none;
        height: 25px;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .pokedex {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .search {
        font-family: 'Inter', sans-serif;
        display: inline-block;
        width: 250px;
        padding: 0 25px;
        height: 50px;
        border-radius: 25px;
        border: 1px solid black;
    }

    .search:focus {
        outline: none;
    }

    .load {
        font-family: 'Inter', sans-serif;
        display: inline-block;
        width: 250px;
        height: 50px;
        border-radius: 5px;
        border: 1px solid black;
        background: white;
    }

    .entries {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
</style>