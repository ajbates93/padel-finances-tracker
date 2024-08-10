import { createAuth0 } from "@auth0/auth0-vue";

export default defineNuxtPlugin((nuxtApp) => {
  const auth0 = createAuth0({
    domain: "dev-rk3u6njz6w8wwbly.uk.auth0.com",
    clientId: "i1TglLJQf4EKqnqKmuttE3fIDRYoDFga",
    authorizationParams: {
      redirect_uri: "http://localhost:3000",
    },
  });

  if (import.meta.client) {
    nuxtApp.vueApp.use(auth0);
  }

  addRouteMiddleware("auth", () => {
    if (import.meta.client) {
      auth0.checkSession();
      if (!auth0.isAuthenticated.value) {
        auth0.loginWithRedirect({
          appState: {
            target: useRoute().path,
          },
        });
      }
    }
  });
});
