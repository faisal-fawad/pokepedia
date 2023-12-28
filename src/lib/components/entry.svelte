<script>
    import { capitalize } from '$lib/index.js';
    
    export let name;
    export let id;
    export let image;
    export let isChain;
</script>

<a class={isChain ? "chain-a" : ""} href={"/" + id}>
    <ul class={isChain ? "chain-ul" : ""}>
        <li class="name">{capitalize(name)}</li>
        {#if !isChain}
        <li class="id">{"#" + id}</li>
        {/if}
    </ul>
    <img loading="lazy" src={image} alt={"Image of " + capitalize(name)}/>
</a>

<style>
    a {
        display: inline-block;
        background-color: var(--entry-background);
        text-decoration: none;
        transition: .5s;
        height: 240px;
        width: 200px;
    }

    .chain-a {
        transition: .5s;
        height: 200px;
        width: 160px;
    }

    a:hover {
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
        font-size: 1em;
    }

    .chain-ul {
        justify-content: center;
        font-size: .95em;
    }

    img {
        box-sizing: border-box;
        width: 100%;
        height: calc(100% - 40px);
        padding: 10px;
        object-fit: contain;
        object-position: center;
    }

    li {
        transition: .5s;
    }

    @media only screen and (max-width: 750px) {
        ul, .chain-ul {
            font-size: .9em;
        }

        a {
            height: 200px;
            width: 160px;
        }
    }
</style>