<template>
  <Layout>
    <header
      class="bg-header flex items-center w-full justify-center h-auto py-12 md:py-64 "
      :style="
        `background: url(${
          $page.home.edges[0].node.headerImage.url
        }?auto=compress&fit=crop&w=1800&crop=entropy) center center no-repeat; background-attachment: fixed;`
      "
    >
      <div
        class="bg-white  opacity-25 opacity-75 font-serif mx-4 p-4 text-center md:p-8 rounded-lg"
      >
        <h1
          class="font-maintitle text-5xl sm:text-7xl block text-center sm:pr-8 text-gray-700"
        >
          {{ $page.home.edges[0].node.title }}
        </h1>
        <p
          class="center text-y text-yellow-600 text-center text-2xl uppercase tracking-wider font-display"
        >
          {{ $page.home.edges[0].node.tagline }}
        </p>
      </div>
    </header>
    <div class="max-w-3xl px-4 mx-auto">
      <div class="social">
        <a :href="$page.social.edges[0].node.instagram">
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
        <a :href="$page.social.edges[0].node.twitter">
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
        <a :href="$page.social.edges[0].node.facebook">
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
      <!-- <div class="mt-8 md:mt-16 flex flex-wrap items-center justify-center">
        <nav>
          <ul>
            <li
              v-for="section in $page.home.edges[0].node.sections"
              :key="section.id"
            >
              <a href="">{{ section.title }}</a>
            </li>
          </ul>
        </nav>
      </div> -->

      <div
        v-for="section in $page.home.edges[0].node.sections"
        :key="section.id"
        class="mt-24"
      >
        <h2 class="text-5xl text-center font-maintitle mt-12" id="yoga">
          {{ section.title }}
        </h2>

        <div class=" flex flex-wrap mt-6 mb-24">
          <div class="w-full md:w-1/2 self-center justify-center ">
            <img
              class="mx-auto rounded-lg "
              :src="
                `${section.image.url}?auto=compress&fit=crop&w=350&crop=entropy`
              "
            />
          </div>

          <div
            class="self-center justify-center text-xl text-gray-700 pb-2  px-12 mt-12 md:mt-0 md:w-1/2 md:pl-12 md:pr-0"
            v-html="marked(section.copy)"
          />
        </div>
        <Workshops
          v-if="section.title === 'Yoga'"
          :workshops="$page.workshops.edges"
        />
      </div>

      <p class="text-center mt-16 mb-8 text-xs">
        <br />
        &copy; Amanda Lee Caskie 2020
      </p>
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
  }

  home: allDatoHomePage {
    edges {
      node {
        title
        tagline
        headerImage {
          url
        }
        sections {
          title
          copy
          image {
            url
          }
        }
      }
    }
  }
  social: allDatoSocialMedia {
    edges {
      node {
        twitter
        instagram
        facebook
      }
    }
  }

  workshops: allDatoClass(sortBy: "date", order:ASC) {
    edges {
      node {
        title
        date
        signupLink
        price
      }
    }
  }
}
</page-query>
<style lang="postcss">
.social {
  @apply flex text-center justify-center align-middle mt-24;
  svg {
    @apply mx-6;
  }
}

nav ul {
  @apply flex list-none m-0 p-0;
  li {
    @apply text-purple-400 text-3xl px-0;
  }
}
</style>
<script>
import Workshops from "../components/Workshops";

export default {
  components: {
    Workshops,
  },
  metaInfo: {
    title: "Amanda Lee Caskie Whole Beauty",
  },
};
</script>
