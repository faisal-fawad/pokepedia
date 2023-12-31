<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { fly } from 'svelte/transition';
    import { navigating } from '$app/stores';
    import { disableScrollHandling, afterNavigate } from '$app/navigation';
    import Modes from '$lib/components/modes.svelte';

    let checked = false;
    let el;

    afterNavigate(async () => {
        disableScrollHandling();
        if ($navigating && $navigating.from.url.pathname === $navigating.to.url.pathname) el?.scrollIntoView({ behavior: 'smooth' })
        else el?.scrollIntoView({ behavior: 'instant' })
    })

    function toggle() {
        window.document.body.classList.toggle('dark-mode');
    }

    async function determineAnim() {
        if ($navigating && $navigating.from.url.pathname === $navigating.to.url.pathname) return { y: -250, duration: 1000 }
        return { y: 250, duration: 1000 }
    }

    onMount(async () => {
        // Detect dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            checked = true;
        } 
    })
</script>

<div class="container" bind:this={el}>
    <nav>
        <label class="switch">
            <input aria-label="search" id="mode" type="checkbox" on:click={toggle} bind:checked={checked}>
            <span class="slider">
                <Modes/>
            </span>
        </label>
        <a href="/">Poképedia</a>
    </nav>
</div>

{#key $page.url.pathname}
    <div in:fly={{ y: 250, duration: 1000 }}>
        <slot/>
    </div>
{/key}

<style>
    :global(body) {
        transition: .5s;
        background-color: var(--theme-background);
        --theme-background: white;
        --entry-background: rgb(240, 240, 240);
        --entry-background-hover: rgb(220, 220, 220);
        --entry-dark-text: black;
        --entry-light-text: rgb(100, 100, 100);
        --nav-background: rgb(250, 250, 250);
    }

    :global(body.dark-mode) {
        --theme-background: rgb(20, 20, 20);
        --entry-background: rgb(35, 35, 35);
        --entry-background-hover: rgb(50, 50, 50);
        --entry-dark-text: white;
        --entry-light-text: rgb(200, 200, 200);
        --nav-background: rgb(15, 15, 15);
    }

    @media (prefers-color-scheme: dark) {
        /* Flipping styles */
        :global(body.dark-mode) {
            transition: .5s;
            background-color: var(--theme-background);
            --theme-background: white;
            --entry-background: rgb(240, 240, 240);
            --entry-background-hover: rgb(220, 220, 220);
            --entry-dark-text: black;
            --entry-light-text: rgb(100, 100, 100);
            --nav-background: rgb(250, 250, 250);
        }

        :global(body) {
            --theme-background: rgb(20, 20, 20);
            --entry-background: rgb(35, 35, 35);
            --entry-background-hover: rgb(50, 50, 50);
            --entry-dark-text: white;
            --entry-light-text: rgb(200, 200, 200);
            --nav-background: rgb(15, 15, 15);
        }
    }

    /* Scrollbar styling */
    :global(::-webkit-scrollbar) {
        width: 10px;
    }

    :global(::-webkit-scrollbar-track) {
        background: transparent;
    }

    :global(::-webkit-scrollbar-thumb) {
        background: var(--entry-background-hover);
        transition: .5s;
    }

    :global(:root) {
        scrollbar-color: var(--entry-background-hover) transparent;
        scrollbar-width: 10px;
    }

    .container {
        width: 100%;
        height: 75px;
    }

    nav {
        width: 100%;
        height: 75px;
        background-color: var(--nav-background);
        z-index: 1;
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        transition: .5s;
    }

    a {
        font-size: 2em;
        letter-spacing: -1px;
        font-weight: 500;
        padding: 20px;
        text-decoration: none;
        transition: .5s;
        color: var(--entry-dark-text);
    }

    @media only screen and (max-width: 750px) {
        .container, nav {
            height: 60px;
        }

        a {
            font-size: 1.75em;
        }
    }

    /* Slider code */
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        min-width: 60px;
        height: 34px;
        margin: 20px;
    }

    /* Hide default HTML checkbox */
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--entry-background-hover);
        transition: .4s;
        border-radius: calc(34px / 2);
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: var(--entry-dark-text);
        transition: .5s;
        border-radius: 13px;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }
</style>