<script>
    import { capitalize } from '$lib/index.js';
    
    export let name;
    export let id;
    export let image;
</script>

<a class="entry" href={"/" + id}>
    <ul>
        <li class="name">{capitalize(name)}</li>
        <li class="id">{"#" + id}</li>
    </ul>
    <img src={image} alt={"Image of " + capitalize(name)}/>
</a>

<style>
    .entry {
        display: inline-block;
        background-color: var(--entry-background);
        text-decoration: none;
        width: 200px;
        height: 240px;
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