<template>
  <div>
    <p class="text-center font-display text-2xl">Upcoming Classes</p>

    <div v-if="workshops && workshops.length > 0">
      <div
        v-for="workshop in workshops"
        :key="workshop.id"
        class="border-b border-gray-400 pb-6 mb-6 text-center max-w-md mx-auto"
      >
        <h3 class="text-2xl font-display">
          <a :href="workshop.signupLink || '#'" class="text-purple-600 hover:text-purple-800">{{ workshop.title }}</a>
        </h3>
        <p class="date font-sans">
          {{ formatDate(workshop.date) }}
        </p>
        <p class="uppercase text-base mb-4 text-gray-600">
          {{ workshop.price }}
        </p>

        <a
          v-if="workshop.signupLink"
          :href="workshop.signupLink"
          class="font-sans bg-purple-500 hover:bg-purple-600 !text-white font-bold py-2 px-4 rounded-full uppercase text-base no-underline"
        >
          Sign Up
        </a>
      </div>
    </div>
    <p v-else class="text-center text-gray-600 my-8">No upcoming classes at this time.</p>
  </div>
</template>

<script setup>
import { DateTime } from 'luxon';

const props = defineProps({
  workshops: {
    type: Array,
    required: true
  }
});

// Format date using Luxon
const formatDate = (dateString) => {
  if (!dateString) return 'Date TBA';
  try {
    const date = DateTime.fromISO(dateString);
    return date.toFormat('EEEE, MMMM d, h:mm a');
  } catch (e) {
    console.error('Date formatting error:', e);
    return 'Date TBA';
  }
};
</script>

<style scoped>
/* Additional styles for workshop links */
a {
  color: #9333ea; /* Purple-600 */
  text-decoration: none;
}

a:hover {
  color: #7e22ce; /* Purple-700 */
  text-decoration: underline;
}
</style> 