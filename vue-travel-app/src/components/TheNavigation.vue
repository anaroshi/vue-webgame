<template>
  <nav id="nav">
    <p class="logo">The Vue School Travel App</p>
    <ul class="nav-links">
      <li class="links">
        <router-link to="/">Home</router-link>
      </li>
      <li
        v-for="destination in destinations"
        :key="destination.name"
        class="links"
      >
        <router-link
          :to="{
            name: 'DestinationDetails',
            params: { slug: destination.slug },
          }"
          >{{ destination.name }}</router-link
        >
      </li>
    </ul>
    <li class="links">
      <router-link to="/user">Dashboard</router-link>
    </li>
  </nav>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      destinations: store.destinations,
    };
  },
};
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: white;
  border-bottom: 1px solid grey;
  z-index: 1;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#nav a.vue-school-active-class {
  color: #ab26ab;
}
#nav a.router-link-active {
  color: #ab26ab;
}
.nav-links {
  display: flex;
}
.links {
  padding-right: 20px;
  list-style: none;
}
.links:hover {
  text-decoration: underline;
}
.logo {
  font-size: 20px;
  color: purple;
  font-weight: bold;
}
</style>
