<script>
    export let name;
    export let id;
    export let image;

    function capitalize(name) {
        name = name.split('-').map(i => i[0].toUpperCase() + i.substring(1).toLowerCase()).join(' ');
        return name;
    }
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
        background: white;
        text-decoration: none;
        width: 200px;
        height: 240px;
        border: 1px solid black;
    }

    .entry:hover {
        transform: scale(1.05);
    }

    .name {
        color: black;
        font-weight: 500;
    }

    .id {
        color: gray;
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
        width: 200px;
        height: 200px;
        padding: 10px;
        object-fit: contain;
        object-position: center;
    }

</style>