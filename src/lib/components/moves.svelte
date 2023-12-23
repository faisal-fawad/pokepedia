<script>
    import { capitalize, dimColor } from '$lib/index.js';
    import { createMoveStore, filterHandler } from '$lib/stores/moves.js';
    import { onDestroy } from 'svelte';
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

<div class="container" {style}>
    <select bind:value={$store.version}>
    {#each versions as version}
        <option value={version}>{capitalize(version).toUpperCase()}</option>
    {/each}
    </select>
    <table border=1 frame=void rules=rows>
        <tr {style}>
            <th>Level</th>
            <th class="names">Name</th>
            <th>Method</th>
        </tr>
        {#each $store.filtered as move}
            <tr>
                <td>{move.level ? move.level : "-"}</td>
                <td class="names">{capitalize(move.name)}</td>
                <td class="methods">{capitalize(move.method).toUpperCase()}</td>
            </tr>
        {/each}
    </table>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        overflow: hidden;
    }

    select, option {
        font-family: 'Inter', sans-serif;
        font-weight: normal;
        outline: none;
        font-size: .8rem;
        background: transparent;
        border: 1px solid transparent;
    }

    table, select {
        text-align: center;
        width: 400px;
    }

    select:hover {
        filter: saturate(150%);
    }

    .names {
        text-align: left;
    }

    td, th {
        font-weight: normal;
        padding: .25em;
    }
    
    th {
        color: white;
    }

</style>