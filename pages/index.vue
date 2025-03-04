<template>
  <div>
    <header
      class="bg-header flex items-center w-full justify-center h-auto py-12 md:py-64"
      :style="
        `background: url(${
          home?.headerImage?.url
        }?auto=compress) center center no-repeat; background-attachment: fixed;`
      "
    >
      <div
        class="bg-white opacity-25 opacity-75 font-serif mx-4 p-4 text-center md:p-8 rounded-lg"
      >
        <h1
          class="font-maintitle text-5xl sm:text-7xl block text-center sm:pr-8 text-gray-700"
        >
          {{ home?.title }}
        </h1>
        <p
          class="center text-y text-yellow-600 text-center text-2xl uppercase tracking-wider font-display"
        >
          {{ home?.tagline }}
        </p>
      </div>
    </header>
    <div class="max-w-4xl px-4 mx-auto">
      <div class="social">
        <a :href="social?.instagram">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-instagram"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a :href="social?.twitter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-twitter"
          >
            <path
              d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
            ></path>
          </svg>
        </a>
        <a :href="social?.facebook">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-facebook"
          >
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            ></path>
          </svg>
        </a>
      </div>

      <div
        v-for="section in home?.sections"
        :key="section.id"
        class="mt-24"
      >
        <h2 class="text-5xl text-center font-maintitle mt-12" :id="section.title.toLowerCase()">
          {{ section.title }}
        </h2>

        <div class="flex flex-wrap mt-6 mb-24">
          <div class="w-full md:w-1/2 self-center justify-center">
            <img
              v-if="section.image && section.image.url"
              class="mx-auto rounded-lg"
              :src="
                `${section.image.url}?auto=compress&fit=crop&w=350&crop=entropy`
              "
            />
          </div>

          <div
            class="self-center justify-center text-lg text-gray-700 pb-2 px-12 mt-12 md:mt-0 md:w-1/2 md:pl-12 md:pr-0"
            v-html="marked(section.copy)"
          />
        </div>
        
        <!-- Display workshops after the Movement section -->
        <Workshops
          v-if="section.title === 'Movement' && workshops && workshops.length > 0"
          :workshops="workshops"
        />
      </div>

      <p class="text-center mt-16 mb-8 text-xs">
        <br />
        &copy; Amanda Lee Caskie {{ new Date().getFullYear() }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useQuerySubscription } from 'vue-datocms';
import { DateTime } from 'luxon';

// Define the GraphQL queries
const homeQuery = `
  query MyQuery {
    homePage {
      title
      tagline
      headerImage {
        url
      }
      sections {
        id
        title
        copy
        image {
          url
        }
      }
    }
    social {
      twitter
      instagram
      facebook
    }
    allClasses(orderBy: date_ASC) {
      id
      title
      date
      signupLink
      price
      location
    }
  }
`;

// Initialize reactive data
const data = ref(null);
const error = ref(null);
const home = ref(null);
const social = ref(null);
const workshops = ref(null);

// Get the marked function from the plugin
const { $marked: marked } = useNuxtApp();

// Initialize with a server-side fetch for SSR
if (process.server) {
  // Simple fetch for server-side rendering
  const fetchData = async () => {
    try {
      const response = await fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useRuntimeConfig().public.datocmsToken}`,
        },
        body: JSON.stringify({ query: homeQuery }),
      });
      
      const result = await response.json();
      data.value = result.data;
      
      // Extract data
      home.value = data.value?.homePage;
      social.value = data.value?.social;
      workshops.value = data.value?.allClasses;
    } catch (err) {
      error.value = err;
      console.error('Error fetching data:', err);
    }
  };
  
  fetchData();
}

// Only use the subscription API on the client side
onMounted(() => {
  if (process.client) {
    const subscription = useQuerySubscription({
      query: homeQuery,
      token: useRuntimeConfig().public.datocmsToken,
      // Disable real-time updates for initial load
      initial: true,
      enabled: true,
    });
    
    // Update our reactive data when the subscription data changes
    watch(() => subscription.data.value, (newData) => {
      if (newData) {
        data.value = newData;
        home.value = newData?.homePage;
        social.value = newData?.social;
        workshops.value = newData?.allClasses;
        
        // Debug info
        console.log('DatoCMS response:', newData);
        console.log('Workshops data:', workshops.value);
        console.log('Workshops count:', workshops.value?.length || 0);
      }
    }, { immediate: true });
    
    // Handle errors
    watch(() => subscription.error.value, (newError) => {
      if (newError) {
        error.value = newError;
        console.error('DatoCMS error:', newError);
      }
    }, { immediate: true });
  }
});

// Set page metadata
useHead({
  title: 'Amanda Lee Caskie Whole Beauty',
});
</script> 