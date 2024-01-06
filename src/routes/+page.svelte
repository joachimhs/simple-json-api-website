<script>
    import {onMount} from 'svelte';
    import {fetchSections, sections} from "$lib/stores/sectionsStore";
    import Markdown from "$lib/components/Markdown.svelte";

    export let data;
    let selectedSection = null;

    onMount(async () => {
//        await fetchSections();
        selectedSection = '#' + data.sections[0].id;
    });

    function changeSelect() {
        console.log(selectedSection);
        if (selectedSection) {
            document.location.href = selectedSection;
        }
    }
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
                <div class="large-screen-aside">
                    {#each data.sections as section, index}
                        <a on:click={() => selectedSection = '#' + section.id} href={`#${section.id}`}>{index +1}. {section.title}</a>
                    {/each}
                </div>
                <div class="small-screen-aside">
                    <select bind:value={selectedSection} on:change={changeSelect}>
                        {#each data.sections as section, index}
                            <option value={`#${section.id}`} selected={index == 0}>{index +1}. {section.title}</option>
                        {/each}
                    </select>
                </div>

            </aside>
            <article>
                {#each data.sections as section, index}
                    <div class="scroll-placeholder" id={section.id}>&nbsp;</div>
                    <h1>{index +1}. {section.title}</h1>
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
        margin-top: 0.83em;
        font-weight: 300;
    }

    :global(.sections h2) {
        margin-top: 0;
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

    .small-screen-aside {
        display: none;
    }

    .large-screen-aside {
        display: block;
    }

    .scroll-placeholder {
        display: block;
        height: 5px;
    }

    @media (max-width: 650px) {
        .sections {
            display: block;
            width: 100%;
            padding-left: 10%;
            padding-right: 10%;
        }

        .sections select {
            width: 100%;
        }

        .small-screen-aside {
            display: block;
            background: #fff;
            height: 45px;
            line-height: 45px;
        }

        .large-screen-aside {
            display: none;
        }

        .scroll-placeholder {
            display: block;
            height: 50px;
        }

        .sections h1 {
            margin-top: 0;
        }
    }
</style>