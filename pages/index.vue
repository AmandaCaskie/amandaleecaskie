<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading" class="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div class="text-center p-8 bg-white rounded-lg shadow-lg">
        <p class="text-xl font-bold mb-4">Loading...</p>
        <p class="text-gray-500">Please wait while we fetch your content</p>
      </div>
    </div>
    
    <!-- Error state -->
    <div v-if="error && !isLoading" class="fixed inset-0 flex items-center justify-center bg-red-100 bg-opacity-75 z-50">
      <div class="text-center p-8 bg-white rounded-lg shadow-lg max-w-lg">
        <p class="text-xl font-bold mb-4 text-red-600">Error Loading Content</p>
        <p class="text-gray-700 mb-4">{{ typeof error === 'string' ? error : error.message || 'An unknown error occurred' }}</p>
        <button @click="retryFetch" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Retry
        </button>
      </div>
    </div>
    
    <!-- Main content (only show when not loading and no errors) -->
    <div v-if="!isLoading && !error">
      <header
        class="bg-header flex items-center w-full justify-center h-auto py-12 md:py-64"
        :style="
          home?.headerImage?.url
            ? `background: url(${home.headerImage.url}?auto=compress) center center no-repeat; background-attachment: fixed;`
            : 'background-color: #f3f4f6;' // Fallback background color
        "
      >
        <div
          class="bg-white opacity-25 opacity-75 font-serif mx-4 p-4 text-center md:p-8 rounded-lg"
        >
          <h1
            class="font-maintitle text-5xl sm:text-7xl block text-center sm:pr-8 text-gray-700"
          >
            {{ home?.title || 'Welcome' }}
          </h1>
          <p
            class="center text-y text-yellow-600 text-center text-2xl uppercase tracking-wider font-display"
          >
            {{ home?.tagline || '' }}
          </p>
        </div>
      </header>
      <div class="max-w-4xl px-4 mx-auto">
        <div class="social">
          <a :href="social?.instagram || '#'">
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
          <a :href="social?.twitter || '#'">
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
          <a :href="social?.facebook || '#'">
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
          v-for="section in home?.sections || []"
          :key="section.id"
          class="mt-24"
        >
          <h2 class="text-5xl text-center font-maintitle mt-12" :id="section.title ? section.title.toLowerCase() : ''">
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
              v-html="section.copy ? marked(section.copy) : ''"
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
const isLoading = ref(true);

// Function to retry fetching data
const retryFetch = async () => {
  if (process.client) {
    error.value = null;
    isLoading.value = true;
    await fetchData();
    isLoading.value = false;
  }
};

// Get the marked function from the plugin
const { $marked: marked } = useNuxtApp();

// Shared fetch function
const fetchData = async () => {
  try {
    console.log(process.client ? 'Client-side fetch' : 'Server-side fetch', ': Starting');
    const token = useRuntimeConfig().public.datocmsToken;
    
    if (!token) {
      throw new Error('DatoCMS token is undefined');
    }
    
    const response = await fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ query: homeQuery }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      throw new Error(result.errors[0]?.message || 'GraphQL error');
    }
    
    if (!result.data) {
      throw new Error('No data returned from DatoCMS');
    }
    
    console.log(process.client ? 'Client-side' : 'Server-side', ': Data successfully received');
    data.value = result.data;
    
    // Extract data
    home.value = data.value?.homePage;
    social.value = data.value?.social;
    workshops.value = data.value?.allClasses;
    
    console.log('Data loaded:', {
      homeLoaded: !!home.value,
      socialLoaded: !!social.value,
      workshopsCount: workshops.value?.length || 0
    });
    
    return true;
  } catch (err) {
    error.value = err;
    console.error(process.client ? 'Client-side' : 'Server-side', ': Error fetching data:', err);
    return false;
  }
};

// Initialize with a server-side fetch for SSR
if (process.server) {
  fetchData().then(() => {
    isLoading.value = false;
  });
}

// Only use the subscription API on the client side
onMounted(() => {
  if (process.client) {
    console.log('Client-side: Setting up DatoCMS subscription');
    const token = useRuntimeConfig().public.datocmsToken;
    
    if (!token) {
      error.value = new Error('Client-side: DatoCMS token is undefined');
      isLoading.value = false;
      return;
    }
    
    try {
      const subscription = useQuerySubscription({
        query: homeQuery,
        token: token,
        // Disable real-time updates for initial load
        initial: true,
        enabled: true,
      });
      
      // Update our reactive data when the subscription data changes
      watch(() => subscription.data.value, (newData) => {
        if (newData) {
          console.log('Client-side: Received new data from DatoCMS');
          data.value = newData;
          home.value = newData?.homePage;
          social.value = newData?.social;
          workshops.value = newData?.allClasses;
          
          // Debug info
          console.log('DatoCMS response:', newData);
          console.log('Workshops data:', workshops.value);
          console.log('Workshops count:', workshops.value?.length || 0);
          
          // No longer loading
          isLoading.value = false;
        } else {
          console.warn('Client-side: Received empty data from DatoCMS');
          // If we don't have data after a certain time, set loading to false
          setTimeout(() => {
            if (isLoading.value) isLoading.value = false;
          }, 3000);
        }
      }, { immediate: true });
      
      // Handle errors
      watch(() => subscription.error.value, (newError) => {
        if (newError) {
          error.value = newError;
          console.error('DatoCMS error:', newError);
          isLoading.value = false;
        }
      }, { immediate: true });
      
      // Safety timeout to prevent infinite loading state
      setTimeout(() => {
        if (isLoading.value) {
          isLoading.value = false;
          if (!error.value && !data.value) {
            error.value = new Error('Timeout waiting for DatoCMS data');
          }
        }
      }, 10000);
    } catch (err) {
      console.error('Client-side: Error setting up DatoCMS subscription:', err);
      error.value = err;
      isLoading.value = false;
    }
  }
});

// Set page metadata
useHead({
  title: 'Amanda Lee Caskie Whole Beauty',
});
</script>

<style scoped>
.social {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.social a {
  display: inline-flex;
  padding: 0.5rem;
  color: #4b5563;
  transition: color 0.3s ease;
}

.social a:hover {
  color: #9333ea;
}
</style> 