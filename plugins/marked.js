import { marked } from 'marked';

export default defineNuxtPlugin((nuxtApp) => {
  // Set up marked options
  marked.setOptions({
    smartypants: true,
    gfm: true,
  });
  
  // Make marked available globally
  nuxtApp.provide('marked', (input) => marked(input));
}); 