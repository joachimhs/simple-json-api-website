import { writable } from 'svelte/store';

// Initial value for the store
const initialSections = [];

// Create a writable store
const sections = writable(initialSections);

// Function to fetch +server.js from the API
const fetchSections = async () => {
    try {
        const response = await fetch('/api/sections');
        const data = await response.json();

        // Update the store with the fetched +server.js
        sections.set(data.sections || initialSections);
    } catch (error) {
        console.error('Error fetching +server.js:', error);
    }
};

export { sections, fetchSections };
