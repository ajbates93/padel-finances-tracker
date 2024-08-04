// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2024-08-04",
});