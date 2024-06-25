<template>
  <button id="logout-button" @click.prevent="handleLogout" :disabled="isLoggedOut">Log out</button>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      localStorage.removeItem('token') // Remove token from local storage
      this.$router.push('/login') // Navigate to the login page
    }
  },
  computed: {
    isLoggedOut() {
      return !localStorage.getItem('token') // Check if the token is absent
    }
  }
}
</script>

<style scoped>
#logout-button {
  background-color: red;
  color: black;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

#logout-button[disabled] {
  background-color: lightgray;
  color: gray;
  cursor: not-allowed;
}
</style>
