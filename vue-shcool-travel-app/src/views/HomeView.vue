<template>
  <div class="home">
    <h1>All Destinations</h1>
    <button @click="addDynamicRoute">Add Dynamic Route</button> |
    <button @click="removeRout">Remove Route</button> |
    <router-link to="/dynamic">Visit Dynamic Route</router-link>
    <br />
    <button @click="triggerRouterError">Trigger Router Error</button>
    <div class="destinations">
      <router-link
        v-for="destination in destinations"
        :key="destination.id"
        :to="{ name: 'destination.show', params: { slug: destination.slug } }"
      >
        <h2>{{ destination.name }}</h2>
        <img :src="`/images/${destination.image}`" :alt="destination.name" />
      </router-link>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data";
import { isNavigationFailure, NavigationFailureType } from "vue-router";

export default {
  data() {
    return {
      destinations: sourceData.destinations,
    };
  },
  methods: {
    addDynamicRoute() {
      this.$router.addRoute({
        name: "dynamic",
        path: "/dynamic",
        component: () => import("@/views/LoginView"),
      });
      // this.$router.removeRoute("dynamic");
    },
    removeRout() {
      this.$router.removeRoute("dynamic");
    },
    async triggerRouterError() {
      const navigationFailure = await this.$router.push("/");
      if (
        isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)
      ) {
        // thisgs went wrong
        console.log("navigationFailure to : " + navigationFailure.to);
        console.log("navigationFailure from : " + navigationFailure.from);
      } else {
        // all is well
      }
    },
  },
};
</script>
