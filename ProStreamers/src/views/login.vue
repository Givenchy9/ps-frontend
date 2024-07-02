<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div
      class="bg-gray-600 shadow-xl bg-transparent-10 p-4 rounded-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Sign in
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <p class="mt-10 bg-red-400 rounded-sm text-center text-lg text-white">{{ this.error }}</p>

        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex shadow-xl w-full justify-center rounded-md bg-violet-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div v-if="!loading" class="text-white">Login</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
            </div>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-white">
        Not a member?
        {{ ' ' }}
        <a href="/register" class="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
          >Register here</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        })
        const data = await response.json()
        if (data.success) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          localStorage.setItem('tokenTime', new Date().toISOString())
          this.error = ''
          this.loading = false
          this.$router.push('/films')
        } else {
          this.loading = false

          this.error = 'Password or Email combination is incorrect'
        }
      } catch (e) {
        this.loading = false
        this.error = 'An error occured: ' + e
      }
    }
  }
}
</script>
