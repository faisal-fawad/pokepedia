<script>
    import { dimColor } from '$lib/index.js';

    export let text;
    export let color;

    $: style = "background: " + dimColor(color) + ";";
</script>

<div {style}>{text}</div>

<style>
    div {
        font-size: 2em;
        font-weight: 500;
        letter-spacing: -1px;
        color: white;
        padding: 2.5px 10px;
        border-radius: 10px;
        margin-bottom: 25px;
        white-space: nowrap;
    }
</style>