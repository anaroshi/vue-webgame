<template>
  <div class="card">
    <img :src="`/images/${experience.image}`" :alt="experience.name" />
    <p>{{ experience.name }}</p>
  </div>
</template>

<script>
export default {
  props: {
    experience: {
      type: Object,
      required: true,
    },
  },
};
</script>
