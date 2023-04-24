<template>
  <dev>
    <h1>Greetings, {{ username }}</h1>
    <button @click="logout">Logout</button>
    <router-link :to="{ name: 'Invoices' }">
      <button>Invoices</button>
    </router-link>
  </dev>
</template>

<script>
export default {
  data() {
    return {
      username: window.user,
    };
  },
  methods: {
    logout() {
      window.user = null;
      this.$router.push({ name: "Home", query: { logout: null } });
    },
  },
};
</script>
