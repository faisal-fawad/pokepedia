<script>
    import { typeToColor, capitalize } from '$lib/index.js';
    export let showName;
    export let name;
    let border = showName ? "border-radius: 10px;" : "border-radius: 30px"
</script>

<ul style={"background: " + typeToColor[name] + "; box-shadow: 0 0 20px " + typeToColor[name] + ";" + border}>
{#if showName}
    <li style={"padding-left: 10px;"}>{capitalize(name)}</li>
{/if}
<li class="wrapper">
    <img src={"/assets/types/" + name + ".svg"} alt={"Image of " + name + " type"}/>
</li>
</ul>

<style>
    ul {
        list-style: none;
        margin: 0 8px 8px 0;
        padding: 0;
        display: inline-flex;
        align-items: center;
        color: white;
        transition: .25s ease;
        cursor: default;
    }

    ul:hover {
        filter: saturate(150%);
        transform: scale(1.05);
    }

    .wrapper {
        width: 40px;
        height: 40px;
    }

    img {
        width: 60%;
        height: 60%;
        margin: 20%;
    }

</style>