<template>
  <div>
    <header class="px-4 py-3 bg-blue-500 flex items-center justify-between">
      <nav>
        <NuxtLink
          to="/"
          class="font-mono font-bold text-gray-100 hover:text-white mr-2 pr-2 border-r"
          >PFT</NuxtLink
        >
        <NuxtLink to="/dashboard" class="text-gray-100 hover:text-white px-2"
          >Dashboard</NuxtLink
        >
        <NuxtLink to="/dashboard" class="text-gray-100 hover:text-white px-2"
          >Settings</NuxtLink
        >
      </nav>
    </header>
    <slot />
  </div>
</template>
