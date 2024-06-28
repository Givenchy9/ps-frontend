<template>
  <footer>
    <nav
      class="h-12 grid grid-cols-4 fixed left-0 bottom-0 w-full backdrop-blur-xl text-white text-center"
    >
      <RouterLink
        to="/"
        active-class="text-gray-900 border-b-2 border-black"
        class="text-white font-bold py-2 px-4 hover:text-white duration-200"
      >
        <i class="fa-solid fa-play fa-xl text-gray-400"></i>
      </RouterLink>
      <RouterLink
        to="/favorites"
        active-class="text-gray-900 border-b-2 border-black"
        class="text-white font-bold py-2 px-4 hover:text-white duration-200"
      >
        <i class="fa-solid fa-star fa-xl text-gray-400"></i>
      </RouterLink>
      <RouterLink
        to="/search"
        active-class="text-gray-900 border-b-2 border-black"
        class="text-white font-bold py-2 px-4 hover:text-white duration-200"
      >
        <i class="fa-solid fa-magnifying-glass fa-xl text-gray-400"></i>
      </RouterLink>
      <RouterLink
        to="/user"
        active-class="text-gray-900 border-b-2 border-black"
        class="text-white font-bold py-2 px-4 hover:text-white duration-200"
      >
        <i class="fa-solid fa-gear fa-xl text-gray-400"></i>
      </RouterLink>
    </nav>
  </footer>
</template>

<style></style>
