<script>
    import {onMount} from 'svelte';
    import {fetchSections, sections} from "$lib/stores/sectionsStore";
    import Markdown from "$lib/components/Markdown.svelte";

    export let data;

    onMount(async () => {
//        await fetchSections();
    });
</script>


<header>
    <div class="page-content">
        <img src="/images/simplejsonapi_logo.png" alt="Your Logo"/>
    </div>
</header>

<main>
    <div class="page-content">
        <div class="sections">
            <aside>
                {#each data.sections as section, index}
                    <a href={`#${section.id}`}>{index +1}. {section.title}</a>
                {/each}
            </aside>
            <article>
                {#each data.sections as section, index}

                    <h1 id={section.id}>{index +1}. {section.title}</h1>
                    <p><Markdown toHtml={section.content} /></p>
                {/each}
            </article>
        </div>
    </div>
</main>

<style>
    /* Add your styles here */
    :global(body) {
        font-family: sans-serif;
        font-weight: 100;
        margin: 0;
        padding: 0;
    }

    .page-content {
        width: 75%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    header {
        background-color: #8bc3cd;
        color: white;
        padding: 10px;
        text-align: center;
    }

    nav {
        display: flex;
        justify-content: space-around;
        background-color: #555;
        padding: 10px;
    }

    nav a {
        color: white;
        text-decoration: none;
        padding: 10px;
    }

    main {
        margin-top: 50px;
    }

    main .page-content {

    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

    .sections {
        display: grid;
        grid-template-columns: 300px 1fr;
        width: 100%;
    }

    .sections h1 {
        font-weight: 300;
    }

    :global(.sections h2) {
        font-weight: 300;
    }

    :global(.sections pre) {
        background-color: #f9feff;
        padding: 15px;
        border: 1px solid #8bc3cd;
        border-radius: 6px;
    }

    aside {
        display: block;
        position: sticky;
        top: 0; /* Stick to the top of the viewport */
        max-height: 100vh;
    }

    aside a {
        display: list-item;
        list-style: none;
        text-decoration: none;
        color: #000;
        font-weight: 500;
    }

    article {

    }

    article p {
        margin-bottom: 75px;
    }
</style>