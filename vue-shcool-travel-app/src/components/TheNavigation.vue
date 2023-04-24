<template>
  <div id="nav">
    <AppLink to="/" id="logo">Vue School Travel App</AppLink>
    <AppLink
      v-for="destination in destinations"
      :key="destination.id"
      :to="{ name: 'destination.show', params: { slug: destination.slug } }"
    >
      {{ destination.name }}
    </AppLink>
    <AppLink :to="{ name: 'Protected' }">Dashboard</AppLink>
    <AppLink to="https://vueschool.io">Vue School</AppLink>
  </div>
</template>

<script>
import sourceData from "@/data";

export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
};
</script>

<style>
#nav a.vue-school-active-link {
  color: #ab26ab;
  border-bottom: 2px solid #ab26ab;
}
</style>
