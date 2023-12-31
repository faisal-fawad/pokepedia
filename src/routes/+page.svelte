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
        const res = await fetch('/api/pokemon');
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
<main class="pokedex">
    <hr/>
    <div class="search-container">
        <input class="search" id="search" placeholder="Search..." bind:value={$store.search}/>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="122.879px" height="119.799px" viewBox="0 0 122.879 119.799" enable-background="new 0 0 122.879 119.799" xml:space="preserve">
            <path d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"/>
        </svg>
    </div>
    <hr/>
    <div class="entries">
        {#if loading}
            <Loading size=60/>
        {:else}
            {#each $store.filtered.slice(0, upper) as pokemon}
                <Entry name={pokemon.name} id={pokemon.id} image={pokemon.image} isChain={false}/>
            {/each}
        {/if}
    </div>
    <hr bind:this={end}/>
    {#if upper < $store.filtered.length}
        <button class="load" on:click={update}>Load more Pokémon...</button>
        <hr/>
    {/if}
</main>

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

    .search-container {
        width: 350px;
        height: 50px;
        border-radius: 25px;
        overflow: hidden;
        display: flex;
        transition: .5s;
        color: var(--entry-dark-text);
        background-color: var(--entry-background);
        box-shadow: 0 0 10px var(--entry-background);
    }

    .search {
        font-family: 'Inter', sans-serif;
        display: inline-block;
        flex-grow: 1;
        padding: 0;
        padding-left: 25px;
        border: none;
        font-size: 1em;
        transition: .5s;
        color: var(--entry-dark-text);
        background-color: var(--entry-background);
    }

    .search::placeholder {
        color: var(--entry-light-text);
        opacity: 1;
    }

    .search:focus {
        outline: none;
    }

    .search-container svg {
        height: 20px;
        width: 20px;
        min-height: 20px;
        min-width: 20px;
        padding: 15px 25px 15px 15px;
        fill: var(--entry-light-text);
    }

    .load {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        display: inline-block;
        width: 350px;
        height: 50px;
        border-radius: 25px;
        border: none;
        background: var(--entry-background);
        box-shadow: 0 0 10px var(--entry-background);
        font-size: 1em;
        color: var(--entry-dark-text);
        transition: .5s;
        cursor: pointer;
        padding: 0 10px;
    }

    .load:hover {
        background-color: var(--entry-background-hover);
    }

    .entries {
        box-sizing: border-box;
        width: 100%;
        padding: 0 5px;
        gap: 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media only screen and (max-width: 750px) {
        .search-container svg {
            display: none;
        }

        .search-container {
            width: 80%;
        }

        .search {
            width: 100%;
        }

        .search-container svg {
            flex-grow: 1;
        }

        .load {
            width: 80%;
        }
    }
</style>