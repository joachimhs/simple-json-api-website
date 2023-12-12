<script>
    import { marked } from 'marked';
    export let toHtml = '';
</script>

{#if toHtml}
    {@html marked(toHtml) }
{/if}

<style>
</style>