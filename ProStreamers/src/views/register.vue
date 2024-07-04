<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div
      class="bg-gray-600 shadow-xl bg-transparent-10 p-4 rounded-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create an account
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <p class="mt-10 bg-red-400 rounded-sm text-center text-lg text-white">{{ this.error }}</p>
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-white">Name</label>
          <div class="mt-2">
            <input
              v-model="name"
              id="name"
              name="name"
              type="name"
              required
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
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
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Confirm password</label
            >
          </div>
          <div class="mt-2">
            <input
              v-model="confirm_password"
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
            <div v-if="!loading" class="text-white">Register</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
            </div>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-white">
        Already have a account?
        {{ ' ' }}
        <a href="/login" class="font-semibold leading-6 text-indigo-300 hover:text-indigo-500"
          >Login here</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      error: null,
      loading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.loading = true
      this.error = null

      if (this.password !== this.confirm_password) {
        this.loading = false
        this.error = 'Passwords do not match'
        return
      }

      try {
        const csrfResponse = await fetch('http://www.chrisouboter.com/csrf');
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;
        console.log(csrfToken);
        const response = await fetch('http://www.chrisouboter.com/api/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            name: this.name
          })
        })

        const data = await response.json()

        if (data.success) {
          this.error = ''
          this.loading = false
          this.$router.push('/films')
        } else {
          this.error = data.message
        }
      } catch (e) {
        this.error = 'An error occurred: ' + e.message
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
