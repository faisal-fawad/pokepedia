<script>
    export let size;
</script>

<img style={"width: " + size.toString() + "px; height: " + size.toString() + "px;"} src="loading.svg" alt="Loading..."/>

<style>
    img {
        animation: spin 1s infinite ease;
    }
    
    @keyframes spin {
        0% {
            transform: rotate(0);
        }

        100% {
            transform: rotate(360deg);
        }
    }
</style>