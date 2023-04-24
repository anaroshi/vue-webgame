<template>
  <div>
    <section v-if="destination" class="destination">
      <h1>{{ destination.name }}</h1>
      <GoBack />
      <div class="destination-details">
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
        <p>{{ destination.description }}</p>
      </div>
    </section>
    <section v-if="destination" class="experiences">
      <h2>Top Experiences in {{ destination.name }}</h2>
      <div class="cards" id="experience">
        <router-link
          v-for="experience in destination.experiences"
          :key="experience.slug"
          :to="{
            name: 'experience.show',
            params: { experienceSlug: experience.slug },
            hash: '#experience',
          }"
        >
          <ExperienceCard :experience="experience" />
        </router-link>
      </div>
      <router-view :key="$route.path" />
    </section>
  </div>
</template>

<script>
//import sourceData from "@/data";
import ExperienceCard from "@/components/ExperienceCard";
import GoBack from "@/components/GoBack";

export default {
  components: {
    ExperienceCard,
    GoBack,
  },
  data() {
    return {
      destination: null,
    };
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    // destinationSlug() {
    //   return this.$route.params.slug;
    // },
    // destination() {
    //   return sourceData.destinations.find(
    //     (destination) => destination.slug === this.slug
    //   );
    // },
  },
  methods: {
    async initData() {
      const response = await fetch(
        `https://travel-dummy-api.netlify.app/${this.slug}.json`
      ); // ajax와 같은 개념 - 확장자 .json 꼭 써주기
      this.destination = await response.json();
    },
  },
  async created() {
    this.initData();
  },
};
</script>
