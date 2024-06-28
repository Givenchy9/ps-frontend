<template>
  <div class="flex min-h-full flex-1 flex-col justify-center lg:px-8">
    <div class="bg-transparent-10 p-4 rounded-xl mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Edit account information
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <p class="mt-10 bg-red-400 rounded-sm text-center text-lg text-white">{{ error }}</p>
        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-white">Name</label>
          <div class="mt-2">
            <input
              v-model="name"
              id="name"
              name="name"
              type="text"
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
          <button
            type="submit"
            class="flex shadow-xl w-full justify-center rounded-md bg-violet-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div v-if="!loading" class="text-white">Change details</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const email = ref('')
    const name = ref('')
    const error = ref(null)
    const loading = ref(false)

    const fetch = () => {
      const token = localStorage.getItem('token')
      const url = 'https://www.chrisouboter.com/api/user/get'
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          const user = response.data.user
          email.value = user.email
          name.value = user.name
        })
        .catch((err) => {
          error.value = 'Failed to fetch user data: ' + err
        })
    }

    const handleSubmit = async () => {
      console.log(' here')
      loading.value = true
      const token = localStorage.getItem('token')

      try {
        const response = axios
          .post('https://www.chrisouboter.com/api/user/edit', {
            method: 'POST',

            body: JSON.stringify({
              email: email.value,
              name: name.value
            }),
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((r) => {
            console.log(r)
          })
      } catch (e) {
        loading.value = false
        error.value = 'An error occurred: ' + e
        console.log(e)
      }
    }

    onMounted(fetch)

    return {
      email,
      name,
      error,
      loading,
      handleSubmit
    }
  }
}
</script>
