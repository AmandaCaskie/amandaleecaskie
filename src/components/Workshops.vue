<template>
  <div>
    <p class="text-center font-display text-2xl">Upcoming Classes</p>

    <div
      v-for="workshop in workshops"
      :key="workshop.id"
      class="border-b border-gray-400 pb-6 mb-6 text-center max-w-md mx-auto"
    >
      <h3 class="text-2xl">
        <a :href="workshop.node.signupLink">{{ workshop.node.title }}</a>
      </h3>
      <p class="date font-sans">
        <!-- {{ workshop.node.date }}<br /> -->
        {{ workshop.node.date | luxon:format("EEEE, MMMM d, h:mm a") }}
      </p>
      <p class="uppercase text-base mb-4 text-gray-600">
        {{ workshop.node.price }}
      </p>

      <a
        :href="workshop.node.signupLink"
        class="font-sans bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full uppercase text-base no-underline"
      >
        Sign Up
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["workshops"],
};
</script>
