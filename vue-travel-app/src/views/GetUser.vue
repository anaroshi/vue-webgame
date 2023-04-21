<template>
  <h1>Welcome {{ user }} !!</h1>
  <div><router-link :to="{ name: 'invoices' }">Invoices</router-link></div>
  <button @click="logOut" class="btn">Log out</button>
</template>

<script>
import store from "@/store";

export default {
  methods: {
    logOut() {
      store.user = null;
      this.$router.push("/"); // redirect to the homepage
    },
  },
  data() {
    return {
      user: store.user,
    };
  },
};
</script>
