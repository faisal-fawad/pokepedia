<script>
    import { capitalize, dimColor } from '$lib/index.js';
    import { createMoveStore, filterHandler } from '$lib/stores/moves.js';
    import { onDestroy } from 'svelte';
    import Dropdown from '$lib/components/dropdown.svelte';
    import Title from '$lib/components/title.svelte';

    export let data;
    let moves = data.moves;
    let versions = data.versions;
    let style = "background: " + dimColor(data.color) + ";";

    const store = createMoveStore(moves, versions[0]);
    const unsubscribe = store.subscribe(model => {
        filterHandler(model);
    })

    onDestroy(async () => {
        unsubscribe();
    })
</script>

<div class="container">
    <Title text={"MOVESET"} color={data.color}/>
    <div class="inner-container">
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
        <Dropdown bind:value={$store.version} options={versions}/>
    </div>
</div>

<style>
    .container {
        align-items: center;
    }

    .container, .inner-container {
        display: flex;
        flex-direction: column;
    }

    .inner-container {
        position: relative;
        width: 500px;
        border-radius: 10px;
        overflow: hidden;
    }

    .moves-container {
        overflow: auto;
        height: 200px;
        background-color: var(--entry-background);
    }

    .wrapper {
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

    .move:hover {
        background-color: var(--entry-background-hover);
    }

    .titles li {
        color: white !important;
        font-weight: 500;
    }

    li {
        padding: 5px 10px;
    }

    li:first-child {
        width: 50px;
        color: var(--entry-light-text);
    }

    li:last-child {
        flex-grow: 1;
        color: var(--entry-dark-text);
    }
</style>