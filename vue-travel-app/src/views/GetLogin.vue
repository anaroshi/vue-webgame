<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form">
      <label for="username">Username</label>
      <input v-model="username" type="text" name="username" class="input" />
      <label for="password">Password</label>
      <input v-model="password" type="text" name="password" class="input" />
      <button @click="login" class="btn">Login</button>
    </div>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      username: null,
      password: null,
    };
  },
  methods: {
    login() {
      // Authenticate against API
      store.user = this.username;
      //this.$router.push("/user");
      const redirectPath = this.$route.query.redirect || "/";
      this.$router.push(redirectPath); // 이동할 경로
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}
</style>
