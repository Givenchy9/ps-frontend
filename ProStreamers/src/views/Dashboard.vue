<template>
  <div v-if="loading" class="flex m-auto w-full"><i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-black dark:text-white"></i></div>
  <div v-if="!loading" class="Films flex">
  
    <div class="w-2/4">
      <table class="table-auto w-full text-white">
        <thead>
          <tr>
            <th class="px-4 py-2">ID</th>

            <th class="px-4 py-2">Title</th>
            <th class="px-4 py-2">Genre</th>

            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in data" :key="d.id">
            <td class="border px-4 py-2">{{ d.id }}</td>

            <td class="border px-4 py-2">{{ d.title }}</td>
            <td class="border px-4 py-2">{{ d.genre }}</td>

            <td class="border px-4 py-2">
              <button @click="handleClick(d.id)" class="bg-red-500 p-12 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                <p v-if="LoadingDelete"><i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-black dark:text-white"></i></p>
                <p v-else >Delete</p>
              </button>
            </td>
            
          </tr>
          
        </tbody>
      </table>
    </div>
    <div class="w-2/4 p-2 fixed right-0">
      <form class="space-y-6" @submit.prevent="handleSubmit">


        <div>
          <div class="flex items-center justify-between">

            
          </div>
          <div class="mt-2">
            <input
              v-model="title"
            placeholder="Title"
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>

  <div class="mt-2">
    <textarea
    placeholder="Description"
      v-model="description"
      class="p-2 block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
      rows="2"
    ></textarea>
  </div>
</div>
        
        <div>
          <div class="mt-2">
            <select v-model="genre" class="w-full p-2 rounded-full bg-gray-200">
              <option>Animation</option>  
              <option>Action</option>
              <option>Adventure</option>
              <option>Horror</option>
              <option>Drama</option>
              <option>Romance</option>
            
        </select>
          </div>
        </div>
        <div>
          <div class="mt-2">
            <select v-model="content" class="w-full p-2 rounded-full bg-gray-200">
              <option>Movie</option>
              <option>Serie</option>
            
        </select>
          </div>
        </div>



        <div>
          <div class="mt-2">
            <input
              v-model="episodes"
              placeholder="Episodes"
              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="mt-2">
            <input
              v-model="length"
              placeholder="Length (minutes)"

              class="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex shadow-xl w-full justify-center rounded-md bg-violet-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-xl hover:bg-violet-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <div v-if="!loading" class="text-white">Create</div>
            <div v-if="loading" class="loading-screen">
              <i class="fa-solid fa-spinner fa-spin-pulse fa-xl text-white"></i>
            </div>
          </button>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script lang="ts">
import { ref, onMounted, watch, defineComponent } from 'vue'
import axios from 'axios'
import Footer from '@/components/Footer.vue'
interface Film {
  id: number
  title: string
  genre: string
}
export default defineComponent({
  components: {
    Footer
  },
  setup() {
    const data = ref<Film[]>([])
    const loading = ref(false)
    const selected = ref('All')
    const search = ref('')
    const alfa = ref(false)
    const LoadingDelete = ref(false)


    const title = ref('')
    const description = ref('')
    const genre = ref('Animation')
    const content = ref('Movie')
    const episodes = ref('')
    const length = ref('')

    const handleSubmit = () => {
      loading.value = true

      console.log("huh");
      const token = localStorage.getItem('token')

      let url = "http://127.0.0.1:8000/api/content/create"
      axios.post(url, {
        title: title.value,
        description: description.value,
        genre: genre.value,
        content: content.value,
        length: length.value,
        episodes: episodes.value,
      }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((r) => {
          console.log(r);
      loading.value = false
      fetch()

        })
    }

    const handleClick = (id: any) => {

      console.log(id);
      LoadingDelete.value = true;
      const token = localStorage.getItem('token')

      let url = "http://127.0.0.1:8000/api/content/delete"
      axios
      .post(url, {
        'content_id': id
      }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data.data)
          data.value = response.data.data
          console.log(data);
          fetch()
          
        });
    }

    const fetch = () => {
      loading.value = true
      console.log("loaded");
      const token = localStorage.getItem('token')
      let url = "http://127.0.0.1:8000/api/content/all"

      axios
      .post(url, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log(response.data.data)
          data.value = response.data.data
          LoadingDelete.value = false;
          loading.value = false
        });
    }
    onMounted(fetch)

    return {
      data,
      loading,
      selected,
      search,
      alfa,
      title,
      description,
      genre,
      content,
      episodes,
      length,
      handleSubmit,
      handleClick,
      LoadingDelete,
    }
  }
})
</script>

<style scoped>
.filter-section {
  position: fixed;
  left: 0;
  height: 100%;
  width: 25%;
  background: transparent;
}

.film-content {
  margin-left: 25%;
  width: 75%;
  height: 700px;
  padding: 1rem;
}

.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  font-size: 1.5em;
  color: #333;
}

.film-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding-bottom: 16rem;
}
</style>
