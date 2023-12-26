<script>
    import { capitalize } from '$lib/index.js';
    
    export let name;
    export let id;
    export let image;
    export let isChain;

    let style = isChain ? "font-size: .95em; justify-content: center;" : "font-size: 1em; justify-content: space-between;";
    let size = isChain ? "height: 200px; width: 160px;" : "height: 240px; width: 200px;"; 
</script>

<a class="entry" href={"/" + id} style={size}>
    <ul {style}>
        <li class="name">{capitalize(name)}</li>
        {#if !isChain}
        <li class="id">{"#" + id}</li>
        {/if}
    </ul>
    <img src={image} alt={"Image of " + capitalize(name)}/>
</a>

<style>
    .entry {
        display: inline-block;
        background-color: var(--entry-background);
        text-decoration: none;
        transition: background-color .5s;
    }

    .entry:hover {
        background-color: var(--entry-background-hover);
    }

    .name {
        color: var(--entry-dark-text);
        font-weight: 500;
    }

    .id {
        color: var(--entry-light-text);
    }

    ul {
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        margin: 0;
        padding: 10px 10px 0 10px;
        display: flex;
        list-style: none;
        justify-content: space-between;
    }

    img {
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
        object-fit: contain;
        object-position: center;
    }

</style>