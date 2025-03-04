// We don't need to import anything special for basic setup
export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  
  // Provide the token to the application for use in components
  nuxtApp.provide('datocmsToken', runtimeConfig.public.datocmsToken);
}); 