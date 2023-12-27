<script>
    import { onMount } from "svelte";

    let checked = false;

    function toggle() {
        window.document.body.classList.toggle('dark-mode');
    }

    onMount(async () => {
        // Detect dark mode
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            toggle();
            checked = true;
        } 
    })
</script>

<div class="container">
    <nav>
        <label class="switch">
            <input type="checkbox" on:click={toggle} bind:checked={checked}>
            <span class="slider"></span>
        </label>
        <a href="/">Poképedia</a>
    </nav>
</div>

<slot></slot>

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
        background-color: #ccc;
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
        background-color: white;
        transition: .5s;
        border-radius: 13px;
    }

    input:checked + .slider {
        background-color: #2196F3;
    }

    input:checked + .slider:before {
        transform: translateX(26px);
    }
</style>