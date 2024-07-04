<template>
  <div class="flex min-h-full flex-1 flex-col justify-center lg:px-8">
    <div class="bg-transparent-10 p-2 rounded-xl sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black dark:text-white"
        >
          Edit account information
        </h2>
      </div>
      <div v-if="loading" class="loading-screen flex justify-center py-12">
        <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-black dark:text-white fa-xl"></i>
      </div>
      <form v-if="!loading" class="space-y-6" @submit.prevent="handleSubmit">
        <p class="mt-10 bg-red-400 rounded-sm text-center text-lg text-black dark:text-white">
          {{ error }}
        </p>
        <p class="mt-10 bg-green-400 rounded-sm text-center text-lg text-black dark:text-white">
          {{ success_message }}
        </p>

        <div>
          <label for="name" class="block text-sm font-medium leading-6 text-black dark:text-white"
            >Name</label
          >
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
          <label for="email" class="block text-sm font-medium leading-6 text-black dark:text-white"
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
            class="flex shadow-xl w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-xl hover:text-white hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div v-if="!loading" class="">Save</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-black dark:text-white"></i>
            </div>
          </button>
        </div>
      </form>
      <button
        @click="confirmDeleteAccount"
        v-if="!loading"
        class="my-4 flex shadow-xl w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm font-semibold leading-6 text-black dark:text-white shadow-xl hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <div v-if="!loading" class="text-black dark:text-white">Delete account</div>
        <div v-if="loading" class="loading-screen">
          <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-black dark:text-white"></i>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  setup() {
    const email = ref('')
    const name = ref('')
    const error = ref(null)
    const loading = ref(true)
    const success_message = ref(null)
    const router = useRouter()

    const fetch = () => {
      const token = localStorage.getItem('token')
      const url = 'http://127.0.0.1:8000/api/user/get'
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
          loading.value = false
        })
        .catch((err) => {
          error.value = 'Failed to fetch user data: ' + err
        })
    }
    const confirmDeleteAccount = () => {
      if (confirm('Are you sure you want to delete your account? This action cant be reversed!!')) {
        delete_account()
      }
    }
    const delete_account = async () => {
      loading.value = true
      const token = localStorage.getItem('token')
      try {
        const response = await axios
          .post(
            'http://127.0.0.1:8000/api/user/delete',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then((r) => {
            localStorage.clear()
            router.push('/login')
          })
      } catch (e) {
        loading.value = false
        error.value = 'An error occurred: ' + e
      }
    }

    const handleSubmit = async () => {
      loading.value = true
      const token = localStorage.getItem('token')

      try {
        const response = await axios.post(
          'http://127.0.0.1:8000/api/user/edit',
          {
            email: email.value,
            name: name.value
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )
        email.value = response.data.user.email
        loading.value = false
        error.value = ''
        success_message.value = 'Saved account details successfully'

        fetch()
      } catch (e) {
        loading.value = false
        error.value = ''

        error.value = 'An error occurred, any changes were not saved'
        fetch()
      }
    }

    onMounted(fetch)

    return {
      email,
      name,
      error,
      loading,
      handleSubmit,
      success_message,
      confirmDeleteAccount,
      useRouter,
      router
    }
  }
}
</script>
