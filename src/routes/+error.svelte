<script>
    import { page } from '$app/stores';
</script>

<ul>
    <li>{$page.status}</li>
    <li>{$page.error.message}</li>
</ul>

<style>
    ul {
        list-style: none;
        padding: 0;
        margin: 50px 0;
        display: block;
        color: var(--entry-dark-text);
        text-align: center;
    }

    li:first-child {
        font-size: 2em;
    }
</style>