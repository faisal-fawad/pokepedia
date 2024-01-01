<script>
    import { capitalize } from '$lib/index.js';
    import { observeHeight } from '$lib/stores/height.js';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    export let options;
    export let value;

    let dropdownOpen = false;
    let dropdownAnimating = false;
    let el;
    const height = writable(0);

    onMount(async () => {
        observeHeight(el, height);
    })

    function handleLostFocus({ relatedTarget, currentTarget }) {
        if (relatedTarget && currentTarget.contains(relatedTarget)) return;
        dropdownOpen = false;
    }

    function handleSelect(newValue) {
        value = newValue;
        dropdownOpen = false;
    }

    function handleAnimation({ propertyName }, isStart) {
        if (propertyName !== "height") return;
        if (isStart) dropdownAnimating = true;
        else dropdownAnimating = false;
    }

    /* Works best with relative positing on the parent of container */
</script>

<div class="container" on:focusout={handleLostFocus} style={"--height: " + $height + "px;"}>
    <button class="current" on:click={() => dropdownOpen = !dropdownOpen} bind:this={el}>
        <svg class={dropdownOpen ? "flip" : ""} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"/>
        </svg>
        <div>{capitalize(value).toUpperCase()}</div>
    </button>
    <ul class={`${dropdownOpen ? "show" : ""} ${dropdownAnimating ? "animate" : ""}`} 
    on:transitionstart={(e) => handleAnimation(e, true)} on:transitionend={(e) => handleAnimation(e, false)}> 
    {#each options as option}
        {#if option !== value}
            <li><button on:click={() => handleSelect(option)}>{capitalize(option).toUpperCase()}</button></li>
        {/if}
    {/each}
    </ul>
</div>

<style>
    .container {
        background-color: var(--entry-background);
    }

    .current {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 5px;
        transition: .5s !important;
    }

    svg {
        width: 20px;
        height: 20px;
        fill: var(--entry-dark-text);
        transition: transform .25s ease, fill .5s ease;
        transform: rotate(0);
    }

    .flip {
        transform: rotate(180deg);
    }

    button {
        font-family: 'Inter', sans-serif;
        font-size: 16px;
        display: block;
        font-weight: normal;
        width: 100%;
        border: none;
        padding: 5px 10px;
        text-align: center;
        cursor: pointer;
        background-color: var(--entry-background);
        color: var(--entry-dark-text);
        transition: background-color .25s;
    }

    button:hover {
        background-color: var(--entry-background-hover);
    }

    ul {
        box-sizing: border-box;
        position: absolute;
        bottom: var(--height);
        width: 100%;
        overflow: auto;
        scrollbar-color: var(--entry-background-hover) transparent;
        scrollbar-width: thin;
        list-style: none;
        padding: 0;
        margin: 0;
        height: 0;
        transition: height .5s ease;
        background-color: var(--entry-background);
    }

    .show {
        height: calc(100% - var(--height));
    }

    .animate {
        overflow: hidden;
    }

    @media only screen and (max-width: 750px) {
        button {
            font-size: 15px;
        }
    }
</style>