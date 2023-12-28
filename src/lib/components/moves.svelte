<script>
    import { capitalize, dimColor } from '$lib/index.js';
    import { createMoveStore, filterHandler } from '$lib/stores/moves.js';
    import { height } from '$lib/stores/height.js';
    import { onDestroy } from 'svelte';
    import Dropdown from '$lib/components/dropdown.svelte';
    import Title from '$lib/components/title.svelte';

    export let pokemon;
    const store = createMoveStore(pokemon.moves, pokemon.versions[0]);
    const unsubscribe = store.subscribe(model => {
        filterHandler(model);
    });

    $: style = "background: " + dimColor(pokemon.color) + ";";
    $: store.set({
        data: pokemon.moves,
        filtered: pokemon.moves,
        version: pokemon.versions[0]
    });

    onDestroy(async () => {
        unsubscribe();
    })
</script>

<div class="container">
    <Title text={"MOVESET"} color={pokemon.color}/>
    <div class="inner-container" style={"height: " + $height + "px;"}>
        <div class="wrapper">
            <ul class="titles" {style}>
                <li>Level</li>
                <li>Name</li>
            </ul>
            <div class="moves-container">
            {#each $store.filtered as move, i}
                <ul class="move">
                    <li>{move.level ? move.level : "-"}</li>
                    <li>{capitalize(move.name)}</li>
                </ul>
            {/each}
            </div>
            <ul class="titles" style={style + "border-radius: 0 0 10px 10px;"}><li style={"text-align: center;"}>Version</li></ul>
        </div>
        <Dropdown bind:value={$store.version} options={pokemon.versions}/>
    </div>
</div>

<style>
    .container {
        align-items: center;
    }

    .inner-container {
        position: relative;
        width: 500px;
        min-height: calc(120px + 30px * 6);
        border-radius: 10px;
        overflow: hidden;
    }

    .container, .inner-container {
        display: flex;
        flex-direction: column;
    }

    .moves-container {
        overflow: auto;
        flex-grow: 1;
        height: calc(100% - 60px) /* 60px come from top and bottom */;
        transition: .5s;
        background-color: var(--entry-background);
    }

    .wrapper {
        height: 100%;
        border-radius: 10px;
        margin-bottom: 10px;
        overflow: hidden;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
    }
    
    .move {
        cursor: default;
        transition: .25s;
    }

    .move:hover {
        background-color: var(--entry-background-hover);
    }

    .titles li {
        color: white !important;
        font-weight: 500;
    }

    li {
        padding: 5px 10px;
        transition: .5s;
    }

    li:first-child {
        width: 50px;
        color: var(--entry-light-text);
    }

    li:last-child {
        flex-grow: 1;
        color: var(--entry-dark-text);
    }

    @media only screen and (max-width: 750px) {
        .inner-container {
            height: 500px !important;
            width: 90vw;
        }

        li {
            font-size: .9em;
        }
    }
</style>