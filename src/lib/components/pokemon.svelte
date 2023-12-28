<script>
    import { dimColor, capitalize } from '$lib/index.js'
    import Type from "$lib/components/type.svelte";
    
    export let pokemon;
    $: style = "background: " + dimColor(pokemon.color) + ";";
    $: types = pokemon.types.map(t => t.type.name);
    $: abilities = pokemon.abilities.map(a => a.is_hidden ? a.ability.name + " [HA]" : a.ability.name);
</script>

<div class="card" style={"box-shadow: 0 0 50px color-mix(in srgb, " + pokemon.color + " 50%, var(--theme-background));"}>
    <div class="title">{capitalize(pokemon.name).toUpperCase()}</div>
    <div class="content">
        <img src={pokemon.image} alt={"Image of " + pokemon.name}>
        <ul>
            <li>
                <div class="header">ID</div>
                <span>{"#" + pokemon.id}</span>
            </li>
            <li>
                <div class="header">Height</div>
                <span>{pokemon.height / 10 + "m"}</span>
            </li>
            <li>
                <div class="header">Weight</div>
                <span>{pokemon.weight / 10 + "kg"}</span>
            </li>
            <li>
                <div class="header">Type</div>
                <span>
                {#each types as type}
                    <Type name={type} showName={true}/>
                {/each}
                </span>
            <li>
                <div class="header">Abilities</div>
                <span>
                {#each abilities as ability}
                    <div class="color" {style}>{capitalize(ability).toUpperCase()}</div>
                {/each}
                </span>
            </li>
            {#if pokemon.forms.length !== 0}
            <li>
                <div class="header">Forms</div>
                <span>
                {#each pokemon.forms as form}
                    <div class="color" {style}>{capitalize(form).toUpperCase()}</div>
                {/each}
                </span>
            </li>
            {/if}
        </ul>
    </div>
</div>

<style>
    .color {
        color: white;
        margin: 0 4px 4px 0;
        border-radius: 7.5px;
        height: 30px; 
        padding: 0 7.5px;
        display: inline-flex; 
        align-items: center;
        border-radius: 10px;
        font-size: .9em; 
    }

    .card {
        display: inline-block;
        padding: 25px;
        border-radius: 25px;
        transition: .5s;
        background-color: var(--entry-background);
        color: var(--entry-dark-text);
    }

    .content {
        display: flex;
        align-items: center;
    }

    .title {
        text-align: center;
        font-size: 3.25em;
        font-weight: 500;
        letter-spacing: -1px;
        padding-bottom: 25px;
    }

    img {
        max-width: 475px;
        max-height: 475px;
        width: 475px;
        height: 475px;
        min-height: 200px;
        min-width: 200px;
        padding: 12.5px;
        object-fit: contain;
        object-position: center;
    }

    ul {
        width: 400px;
        list-style: none;
        margin: 0;
        padding: 0 0 0 100px;
    }

    ul li {
        display: flex;
        padding: 10px;
        font-size: 18px;
    }

    .header {
        width: 125px;
        min-width: 125px;
        font-weight: 600;
    }

    ul li span {
        width: calc(400px - 125px);
        color: var(--entry-light-text);
        transition: .5s;
    }

    @media only screen and (max-width: 1300px) {
        .content {
            flex-direction: column;
        }

        ul {
            padding: 10px 50px;
        }
    }

    @media only screen and (max-width: 750px) {
        .card {
            width: 90%;
            padding: 2.5%;
            box-shadow: none !important;
        }

        img {
            width: 70vw;
            height: 70vw;
        }

        .title {
            font-size: 2em;
            font-weight: 400;
        }
        
        ul {
            width: auto;
            padding: 10px;
        }

        ul li {
            font-size: 15px;
        }

        .header {
            min-width: 75px;
            width: 75px;
        }

        ul li span {
            width: auto;
            color: var(--entry-light-text);
        }
    }
</style>
